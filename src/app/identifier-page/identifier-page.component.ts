import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory, ɵɵsetComponentScope } from '@angular/core';
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
import { GapService } from '../services/gap.service';
import { gap } from '../models/gap';


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
  gap$: Observable<gap[]>;
  //Used for sorting
  weaknessesDataSource;
  searchWeaknesses;
  searchControls
  //Used to bring up correct policy when opening page
  state$: Observable<object>;
  routeSub
  id
  //used to bring up most recent gap assessment
  Gdate$;
  urlAdjuster = "policy"
  //Guidelines 
  guidelines$ = []
  //GAP
  gapList$



 
  policyForm: FormGroup = this.formBuilder.group({
    NidFilterList : []
  });
  NidFilterList = []
  policyLevelOptions: Observable<Policy[]>;
  NidDisplayList$;
  NidFilter$;
  uniqueNidList$;
  currentPolicy;

  

  
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
    private gapservice : GapService,
    private activatedRoute : ActivatedRoute,
    public dialog : MatDialog,
    private sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private CFR:ComponentFactoryResolver,

    ) { }

  ngOnInit(){

    this.uniqueNidList$= this.policyService.getUniqueNids();

    this.NidFilter$ = this.policyForm.get('NidFilterList')!.valueChanges
    .pipe(
      startWith(''),
      map(value=> this._filterNid(value))
    )

    this.NidFilter$.forEach(element => {
    });

    //Unique Lists
    this.uniqueNidList$.forEach(element => {
      this.NidFilterList.push(element)
    });

    //Pulling correct policy.
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.Gdate$ = params['Gdate$']
      });
    

    //Sets defualt page to be AC-N.01
    this.id ? true : this.id = "AC-N.01"
    this.Gdate$ ? true : this.Gdate$ = "4/16/2021"
    //POLICY STUFF
    this.policy$ = this.fetchPolicy(this.id);

    //ACCORDION STUFF
    this.entries = accordionEntries
    this.service.onAccordionClick.subscribe(data =>{
      if (data == "shrink"){

       this.uncollapsed = true;

      document.getElementById('control').className = 'Cshrink'
      document.getElementById('standard3').className = 'Sshrink'
      document.getElementById('weakness').className = 'Wshrink'
      document.getElementById('policy').className = 'Pshrink'


      }
      if (data == "grow"){
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

   //GAP STUFF
   //TODO Idea for later, sort dates chronologically and defualt to most recent date
    this.gap$ = this.fetchAllGap(this.id, this.Gdate$);
    this.gap$.forEach(element => {
      this.gapList$ = []
      element.forEach(element2 => {
        this.gapList$.push(element2)
      });
    });

    this.gapservice.onClick.subscribe(async incomingData=>{
      //the optional param is added when NewDate is toggled on the Gap component
      //its defualt is false, if nothing is given. This makes sure new dates are 
      //posted to, and not updated to (which would fail because it wouldnt exist)
      if (incomingData.idOrgGap && !incomingData.optionalParam){
        //Updates if Id exists
        this.gap$ = await this.gapservice
        .update(incomingData.data).toPromise()
        
      }else if (incomingData.data.Gdate || incomingData.optionalParam){
      //Post if Id does not exist and Date exists (New Entry)
        this.gap$ = await this.gapservice
        .post(incomingData.data).toPromise()
        //After posting we need to refresh data in gap assessment because the new entry
        //will be assigned a Id by the DB. Without refreshing pressing submit again will
        //resubmit the entry like it doesnt already exist.
        this.sharedService.refresh()
        
      }
      else{
        //when we delete we send gapservice a Nid, so data here is just "AC-N.01" or whatever.
        this.gap$ = await this.gapservice
        .delete(incomingData.data).toPromise()
      }

    })
    

    //GUIDELINES STUFF
    this.guidelinesService.onOpen.subscribe(e=>{
      this.openGuideline(e[0],e[1])
    })

    //Refreshing the page after importing anything
    //tried refreshing data and was having issues, so now just navigating to URL again
    this.sharedService.refreshRequest.subscribe( e=>{
      console.log("refresh recieved in identifier page")
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["Policy/",String(this.id).trim() ,String(this.Gdate$).trim()]));
 
    })
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
  getAll(id:any, Gdate:any){
    //calls every get request again. refreshing the backend/data

    
  }
  
  fetchPolicy(id): Observable<policy[]> {
    return this.policyService.fetchAll(id);
  }
  
  fetchAllGap(Nid:any, Gdate:any): Observable<gap[]> {
    return this.gapservice.fetchAll(Nid, Gdate);
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
      //getting the weakness ID from control entry
      let idOrgWeaknesses = event.item.data.idOrgWeaknesses
      let Nid = event.item.data.Nid

    if (event.distance.x < -300 && event.container.id == "controlDrop") {
      this.weaknesses$ = this.weaknessservice
      .patch({Nid, WcompletionDate, Wstatus, idOrgWeaknesses })
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

    //  console.log(result);//returns undefined
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
     // console.log(result);//returns undefined
    });
  }

  openGuideline(id, desc){
    this.guidelines$.push([id,desc])
  }

  closeGuideline(id,desc){
    let i  = 0
    this.guidelines$.forEach(element => {
      if (element[0] == id){
        if (element[1] == desc){
          this.guidelines$.splice(i, 1);
        }
      }
      i += 1
    });
    }

    //Setup the exact same as the gap assessment's. See line 229 in its component.ts for comment.
    _filterNid(value: string){
      this.NidFilterList.forEach(element => {
        if (value){
          this.NidDisplayList$ = element.filter(x=>x.nudgid.includes(value))
          return element.filter(x=> x.nudgid.includes(value))
        }
          this.NidDisplayList$ = element
          return element
    
      });
      
      }

  public policySearch(event: any, name : any)
  {
      //By routing to a random place, then back to the policy page we force the window to refresh and update data
      //Otherwise it would route to Policy/AC-N.02 and still show AC-N.01's page.
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["Policy/",name]));
    
  }


}