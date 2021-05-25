import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory, ɵɵsetComponentScope } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap, startWith } from 'rxjs/operators';
import { controls } from '../models/controls';
import { standards } from '../models/standards';
import { weaknesses } from '../models/weaknesses';
import { ControlsService } from '../services/controls.service';
import { SharedService } from '../services/Shared';
import { WeaknessesService } from '../services/weaknesses.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PolicyAccordionService } from '../services/policy-accordion.service';
import { CdkDrag, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
//@ts-ignore
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MilestoneFormComponent } from '../milestone-form/milestone-form.component';
import { ProcedureFormComponent } from '../procedure-form/procedure-form.component';
import { policy } from '../models/policy';
import { GuidelinesService } from '../services/guidelines.service';
import { GapService } from '../services/gap.service';
import { gap } from '../models/gap';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';
import { Console } from 'node:console';


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

  gapSubscription
  controlSubscription

 
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
    private guidelinesService: GuidelinesService,
    private gapservice : GapService,
    private activatedRoute : ActivatedRoute,
    public dialog : MatDialog,
    private sharedService : SharedService,
    private _formBuilder : FormBuilder,
    private CFR:ComponentFactoryResolver,
    private loginInfo: login,
    private rest_service : restAPI

    ) { }

  ngOnInit(){

    //getting unique Nudg Id's
    this.uniqueNidList$ = this.rest_service.get(`http://192.168.0.70:3000/Policy/${this.id}/${this.loginInfo.CompanyName}/?getUniqueNids=${true}`);
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
    this.Gdate$ ? true : this.Gdate$ = "1/1/2021"
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
    this.controlSubscription =  this.controlsservice.onClick.subscribe(async data =>{

      let temp = await this.controlsservice.post(data, this.loginInfo.CompanyName)
       .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
      temp.subscribe()
    });

  
    //WEAKNESSES STUFF
    this.weaknesses$ = this.fetchAllWeaknesses(this.id);
    this.weaknessservice.onClick.subscribe(data =>{
      this.weaknesses$ = this.rest_service.post(`http://192.168.0.70:3000/weaknesses/${this.id}/${this.loginInfo.CompanyName}`,data)
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

    //This block below handles most of the gap interactions with the database

 
    this.gapSubscription = this.gapservice.onClick.subscribe(async incomingData=>{
      console.log("incoming gap data : ", incomingData)
      //the optional param is added when NewDate is toggled on the Gap component
      //its defualt is false, if nothing is given. This makes sure new dates are 
      //posted to, and not updated to (which would fail because it wouldnt exist)
      if (incomingData.idOrgGap && !incomingData.optionalParam){
        console.log("updating")
        //Updates if Id exists
        this.gap$ = await this.gapservice
        .update(incomingData.data,this.loginInfo.CompanyName).toPromise()
        
      }else if (incomingData.data.Gdate || incomingData.optionalParam){
        console.log("posting")
      //Post if Id does not exist and Date exists (New Entry)
        this.gap$ = await this.gapservice
        .post(incomingData.data ,this.loginInfo.CompanyName).toPromise()
        //After posting we need to refresh data in gap assessment because the new entry
        //will be assigned a Id by the DB. Without refreshing pressing submit again will
        //resubmit the entry like it doesnt already exist.
       
        
      }
      else{
        console.log("deleting")
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




















  fetchPolicy(id): Observable<policy[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/policy/${id}/${this.loginInfo.CompanyName}`);
  }
  
  fetchAllGap(Nid:any, Gdate:any): Observable<gap[]> {
    let tempUrl  = ""
    if (Gdate != "") {
       tempUrl = `http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}/?Gdate=${Gdate}`
    }
    else{
       tempUrl = `http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}`
    }

    return this.rest_service.get(tempUrl);
  }




  updatePolicy(policy,Comments){
    console.log("update called")
    policy.Comments = Comments
    console.log("policy : " ,policy)
    let temp =  this.rest_service.update(`http://192.168.0.70:3000/policy/${policy.nudgid}/${this.loginInfo.CompanyName}`,policy);
    temp.subscribe()

  }






    //id is the control id that is clicked, this.id is the Nid of the page
  fetchAllControls(Nid:any): Observable<controls[]> {
    let CompanyName = this.loginInfo.CompanyName

    return this.rest_service.get(`http://192.168.0.70:3000/controls/${Nid}/${CompanyName}`);
  }
  updateControls(id: number, inventoryItem: Partial<controls>): void {

  }
  deleteControls(id: any): void {

    let CompanyName = this.loginInfo.CompanyName

    let temp = this.rest_service.delete(`http://192.168.0.70:3000/controls/${id}/${CompanyName}`)
    .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
    temp.subscribe()
      
  }
  













  fetchAllWeaknesses(Nid: any): Observable<weaknesses[]> {
    return this.weaknessservice.fetchAll(Nid, this.loginInfo.CompanyName);
  }

  updateWeaknesses(id: number, inventoryItem: Partial<weaknesses>): void {
  /*
    this.weaknesses$ = this.weaknessService
      .update(newWeakness)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));*/
  }
  deleteWeaknesses(id: any): void {
    this.weaknesses$ = this.weaknessservice
      .delete(id,this.loginInfo.CompanyName)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));
      
  }
  
  fetchAllStandards(): Observable<standards[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/standards/${this.id}/${this.loginInfo.CompanyName}`)
  }
  async postStandards(standardEntry: Partial<standards>): Promise<void> {

    const Standard = (<string>standardEntry).trim();
    if (!Standard) return;


    let temp = await this.rest_service.post(`http://192.168.0.70:3000/standards/${this.id}/${this.loginInfo.CompanyName}`,this.loginInfo.CompanyName)
    .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
    temp.subscribe()
  }
  updateStandards(id: number, inventoryItem: Partial<standards>): void {

  }

  async deleteStandards(id: any): Promise<void> {


    let temp = await this.rest_service.delete(`http://192.168.0.70:3000/standards/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
    temp.subscribe()
     
  }























  drop(event: CdkDragDrop<string[]>) {

      let WcompletionDate = String(new Date());
      let Wstatus = "Good"
      //getting the weakness ID from control entry
      let idOrgWeaknesses = event.item.data.idOrgWeaknesses
      let Nid = event.item.data.Nid

    if (event.distance.x < -300 && event.container.id == "controlDrop") {
      this.weaknesses$ = this.weaknessservice
      .patch({Nid, WcompletionDate, Wstatus, idOrgWeaknesses },this.loginInfo.CompanyName)
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
    });
  }

  openGuideline(Nid, desc){
    this.guidelines$.push([Nid,desc])
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

  ngOnDestroy(){
    this.gapSubscription.unsubscribe()
    this.controlSubscription.unsubscribe()
  }

}