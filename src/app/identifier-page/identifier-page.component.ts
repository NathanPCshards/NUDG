import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { filter, map, tap, startWith } from 'rxjs/operators';
import { controls } from '../models/controls';
import { standards } from '../models/standards';
import { weaknesses } from '../models/weaknesses';
import { ControlsService } from '../services/controls.service';
import { SharedService } from '../services/Shared';
import { StandardsService } from '../services/standards.service';
import { WeaknessesService } from '../services/weaknesses.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PolicyAccordionService } from '../services/policy-accordion.service';
import { CdkDrag, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
//@ts-ignore
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MilestoneFormComponent } from '../milestone-form/milestone-form.component';
import { ProcedureFormComponent } from '../procedure-form/procedure-form.component';
import { policy } from '../models/policy';
import { PolicyService } from '../services/policy.service';
import { GuidelinesService } from '../services/guidelines.service';
import { guidelinesDialog } from '../guidelines-page/guidelines-page.component';


//leave for now. The accordion needs these to function
const obj = {
  title: '',
  description: ''
}
const accordionEntries: any[] = [];
for (let i = 0; i < 1; i++) {
  accordionEntries.push(obj);
}


export interface Policy {
  level: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-identifier-page',
  templateUrl: './identifier-page.component.html',
  styleUrls: ['./identifier-page.component.scss']
})
export class IdentifierPageComponent implements OnInit {
  //Drag and drop related
  controlDrop
  weaknessDrop;
  submitted = false;
  highlightToggle$ = false;
  //accordion animation variables
  entries: any[]; 
  grow;
  shrink;
  uncollapsed = false;
  collapse = true;
  //Database obeservables
  weaknesses$: Observable<weaknesses[]>;
  controls$: Observable<controls[]>;
  standards$: Observable<standards[]>;
  policy$: Observable<policy[]>;
  //Used for sorting
  weaknessesDataSource;
  searchWeaknesses;
  searchControls
  //Used to bring up correct policy when opening page
  state$: Observable<object>;
  routeSub
  id
  //Guidelines 
  guidelinesList = []
  //Used where the nudg id is shown on the page. Autocomplete info is pulled from below array
  //You could likely do this by pulling from the database where cmmc level = ?, Which would be better
  //if it changes frequently but this is much easier for now. - just note if a policy is added, it manually needs to be added here.
  policyForm: FormGroup = this._formBuilder.group({
    policyLevel: '',
  });

  policyLevels: Policy[] = [{
    level: 'CMMC Level 1',
    names: ['AC-N.01', 'AC-N.02', 'AC-N.03', 'AC-N.04', 'IA-N.01', 'IA-N.02', 'MP-N.01', 'PE-N.01', 'PE-N.02', 'PE-N.03', 'PE-N.04'
  ,'SC-N.01', 'SC-N.02', 'SI-N.01', 'SI-N.02', 'SI-N.03', 'SI-N.04']
  }, {
    level: 'CMMC Level 2',
    names: ['AC-N.05', 'AC-N.06', 'AC-N.07', 'AC-N.08', 'AC-N.09', 'AC-N.10', 'AC-N.11', 'AC-N.13', 'AC-N.15','AC-N.16', 'AT-N.01', 
    'AT-N.02', 'AU-N.01', 'AU-N.02', 'AU-N.03', 'AU-N.04']
  }, {
    level: 'CMMC Level 3',
    names: ['AC-N.12', 'AC-N.14', 'AC-N.17']
  }, {
    level: 'NIST CUI',
    names: ['AC-N.01', 'AC-N.02', 'AC-N.03', 'AC-N.04','AC-N.05', 'AC-N.06', 'AC-N.07']
  }, {
    level: 'NIST NFO',
    names: ['AC-N.23', 'AT-N.04']
  }];

  policyLevelOptions: Observable<Policy[]>;
  currentPolicy;

  @ViewChild('guidelinesdialog', { read: ViewContainerRef }) formRef //First
  //@ts-ignore
  componentRef: ComponentRef;

  
  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private router:Router, 
    private route: ActivatedRoute,
    private service:PolicyAccordionService,
    private weaknessservice: WeaknessesService,
    private controlsservice: ControlsService,
    private standardsservice: StandardsService,
    private policyService : PolicyService,
    private guidelinesService: GuidelinesService,
    private activatedRoute : ActivatedRoute,
    public dialog : MatDialog,
    private sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private componentFactoryResolver:ComponentFactoryResolver,
    ) { }

  ngOnInit(){
    this.policyLevelOptions = this.policyForm.get('policyLevel')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
    //Pulling correct policy.
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      });

    //Sets defualt page to be AC-N.01
    this.id ? true : this.id = "AC-N.01"

    //POLICY STUFF
    this.policy$ = this.fetchPolicy(this.id);

    console.log("current policy : " , this.currentPolicy)
    //ACCORDION STUFF
    this.entries = accordionEntries
    this.service.onAccordionClick.subscribe(data =>{
      if (data == "shrink"){

       console.log("small")
       this.uncollapsed = true;

      document.getElementById('control').className = 'Cshrink'
      document.getElementById('standard3').className = 'Sshrink'
      document.getElementById('weakness').className = 'Wshrink'
      document.getElementById('policy').className = 'Pshrink'


      }
      if (data == "grow"){
        console.log("grow")
         this.uncollapsed = false;

        document.getElementById('weakness').className = 'Wgrow'
        document.getElementById('control').className = 'Cgrow'
        document.getElementById('policy').className = 'Pgrow'
        document.getElementById('standard3').className = 'Sgrow'


      }

    });
    //CONTROLS STUFF
    this.controls$ = this.fetchAllControls(this.id);
    this.controlsservice.onClick.subscribe(data =>{

      this.controls$ = this.controlsservice
      .post(data)
      .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
    });
  
    //WEAKNESSES STUFF
    this.weaknesses$ = this.fetchAllWeaknesses(this.id);
    this.weaknessservice.onClick.subscribe(data =>{

      this.weaknesses$ = this.weaknessservice
      .post(data)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));
  
      
  });
    //STANDARDS STUFF
    this.standards$ = this.fetchAllStandards();

    //GUIDELINES STUFF
    this.guidelinesService.onOpen.subscribe(e=>{
      console.log("E(idpage): ", e)
      let id = e[0]
      let desc = e[1]
      this.openGuideline(id,desc)
    })
    this.guidelinesService.onClose.subscribe(e=>{
      let id = e[0]
      let desc = e[1]
      this.closeGuideline(id,desc)
    })

  }

  ngAfterViewInit(){

  }

  public filterWeaknesses()
  {
    //by updating search, the html data binding updates and the filter is automatically applied.
    this.searchWeaknesses = (<HTMLInputElement>document.getElementById("searchWeaknesses")).value.toLowerCase()
  }
  public filterControls()
  {
    //by updating search, the html data binding updates and the filter is automatically applied.
    this.searchControls = (<HTMLInputElement>document.getElementById("searchControls")).value.toLowerCase()
  }

  fetchPolicy(id): Observable<policy[]> {

    return this.policyService.fetchAll(id);
  }

  fetchAllControls(Nid:any): Observable<controls[]> {

    return this.controlsservice.fetchAll(Nid);
  }
  updateControls(id: number, inventoryItem: Partial<controls>): void {
    //this.controls$ = this.controlsService
     // .update(newUsers)
    //  .pipe(tap(() => (this.controls$ = this.fetchAll())));
  }
  deleteControls( id: any): void {
    this.controls$ = this.controlsservice
      .delete(id)
      .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
      
  }
  



  fetchAllWeaknesses(Nid: any): Observable<weaknesses[]> {
    return this.weaknessservice.fetchAll(Nid);
  }
  updateWeaknesses(id: number, inventoryItem: Partial<weaknesses>): void {
  /*
    this.weaknesses$ = this.weaknessService
      .update(newWeakness)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));*/
  }
  deleteWeaknesses(id: any): void {
    this.weaknesses$ = this.weaknessservice
      .delete(id)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));
      
  }





  fetchAllStandards(): Observable<standards[]> {
    return this.standardsservice.fetchAll(this.id);
  }
  postStandards(standardEntry: Partial<standards>): void {
    const Standard = (<string>standardEntry).trim();
    if (!Standard) return;
  
    this.standards$ = this.standardsservice
      .post({ Standard })
      .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
  }
  updateStandards(id: number, inventoryItem: Partial<standards>): void {
  /*
    this.standards$ = this.standardsService
      .update(newUsers)
      .pipe(tap(() => (this.standards$ = this.fetchAll())));*/
  }
  deleteStandards(id: any): void {
    this.standards$ = this.standardsservice
      .delete(id)
      .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
      
  }


  drop(event: CdkDragDrop<string[]>) {

      let WcompletionDate = String(new Date());
      let Wstatus = "Good"
      let idOrgControls = event.item.data.idOrgControls
      let Nid = event.item.data.Nid

    if (event.distance.x < -300 && event.container.id == "controlDrop") {
      this.weaknesses$ = this.weaknessservice
      .patch({Nid, WcompletionDate, Wstatus, idOrgControls })
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));

    } else {


    }


  }

//must return true to call Drop().
  controlsToWeaknesses(item: CdkDrag<any>) {
    //this.dragdrop.emit(item.data)
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  weaknessesToControls(item: CdkDrag<any>) {
   // this.dragdrop.emit(item.data)
    return true;
  }



  openMilestones(idOrgWeaknesses){
    let dialogRef = this.dialog.open(MilestoneFormComponent, {
      width: '2400px',
      height: '800px',
      autoFocus : false,
      data: {
        idOrgWeaknesses
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);//returns undefined
    });


  }

  openProcedures(idOrgControls){
    let dialogRef = this.dialog.open(ProcedureFormComponent, {
      width: '2400px',
      height: '800px',
      autoFocus : false,
      data: {
        idOrgControls
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // console.log(result);//returns undefined
    });
  }

  openGuideline(id, desc){
    //@ts-ignore
    const factory: ComponentFactory = this.componentFactoryResolver.resolveComponentFactory(guidelinesDialog);
    const cRef = this.formRef.createComponent(factory)


    console.log("object :")
    this.guidelinesList.push(cRef)

    this.componentRef.instance.output.subscribe(event => console.log("i doubt this prints", event));


  }
  closeGuideline(id,desc){
    const component = this.guidelinesList.find((component) => component.instance instanceof guidelinesDialog);
    const componentIndex = this.guidelinesList.indexOf(component);
    this.componentRef.instance.id = id;
    this.componentRef.instance.desc = desc;

    if (componentIndex !== -1) {
      // Remove component from both view and array
      //find a way to remove correct index 
      //old way didnt work : this.formRef.indexOf(component)
      this.formRef.remove(0);
      this.guidelinesList.splice(componentIndex, 1);
    }
  }
  


  private _filterGroup(value: string): Policy[] {
    if (value) {
      return this.policyLevels
        .map(group => ({level: group.level, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.policyLevels;
  }

  public policySearch(event: any, name : any)
  {
      //By routing to a random place, then back to the policy page we force the window to refresh and update data
      //Otherwise it would route to Policy/AC-N.02 and still show AC-N.01's page.
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["Policy/",name]));
    
  }
  ngOnDestroy() {
    this.componentRef.destroy();    
  }

}


  
