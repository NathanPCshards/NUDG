import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory, ɵɵsetComponentScope } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
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
  uncollapsed$ = false;
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
  GapPolicyStatus$;
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


  //these three lists are used temporarily during functions that add/remove these entries to the policy.
  ctrlList
  weaknessList
  standardsList

  
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
    public dialog : MatDialog,
    private sharedService : SharedService,
    private loginInfo: login,
    private rest_service : restAPI

    ) { }

  async ngOnInit(){
    //Sets defualt page to be AC-N.01
    //Pulling correct policy.
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.Gdate$ = params['Gdate$']
      });
    this.id ? true : this.id = "AC-N.01"
    this.Gdate$ ? true : this.Gdate$ = "1/1/2021"
    
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

    //POLICY STUFF
    this.policy$ = this.fetchPolicy(this.id);

    //ACCORDION STUFF
    this.entries = accordionEntries
 
    this.service.onAccordionClick.subscribe(data =>{
      if (data == "shrink"){

       this.uncollapsed$ = true;

      document.getElementById('control').className = 'Cshrink'
      document.getElementById('standard3').className = 'Sshrink'
      document.getElementById('weakness').className = 'Wshrink'
      document.getElementById('policy').className = 'Pshrink'


      }
      if (data == "grow"){
         this.uncollapsed$ = false;
        document.getElementById('weakness').className = 'Wgrow'
        document.getElementById('control').className = 'Cgrow'
        document.getElementById('policy').className = 'Pgrow'
        document.getElementById('standard3').className = 'Sgrow'


      }
      console.log("sending currently : " , this.uncollapsed$)
    });
    //CONTROLS STUFF
    this.controls$ = this.fetchAllControls(this.id);

    this.controlSubscription =  this.controlsservice.onClick.subscribe(async data =>{
      this.ctrlList = []

      let temp = await this.controlsservice.post(data, this.loginInfo.CompanyName)
       .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
      temp.subscribe(async element=> {
        //Adding Control that was just created.
        this.ctrlList.push(element.insertId)
        //Getting idControl field of current policy.
        let ctrlSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idControls`)
        ctrlSub.forEach(async dataArray => {
          dataArray.forEach(element => {
            //Converting String of "[id1,id2,id3]" to a real array
            let control_ids =  element.idControls.trim().replace("\[","").replace("\]","").split(",")
            control_ids.forEach(id => {
              //Adding ids from policy to temp array
              this.ctrlList.push(Number(id))
            });
          });
          //Updating the policy with the new control id that was made
          let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idControls`,{"nudgid":this.id, "data" :this.ctrlList})
          temp2.subscribe();
        });

      });
      
    });

  
    //WEAKNESSES STUFF
    this.weaknesses$ = this.fetchAllWeaknesses(this.id);
    this.weaknessservice.onClick.subscribe(async data =>{
      let temp2 = await this.rest_service.post(`http://192.168.0.70:3000/weaknesses/${this.id}/${this.loginInfo.CompanyName}`,data)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));
      this.weaknessList = []
      temp2.subscribe(async element=> {
        //Adding weakness that was just created.

        //@ts-ignore, For some reason the compiler doesnt think the element has this insert property, but it does in fact have it
        this.weaknessList.push(element.insertId)

       // this.ctrlList.push(element.insertId)
        //Getting idWeakness field of current policy.
        let weaknessSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idWeaknesses`)
        weaknessSub.forEach(async dataArray => {
          dataArray.forEach(element2 => {
            //Converting String of "[id1,id2,id3]" to a real array
            let weakness_ids =  element2.idWeaknesses.trim().replace("\[","").replace("\]","").split(",")
            weakness_ids.forEach(id => {
              //Adding ids from policy to temp array
              this.weaknessList.push(Number(id))
            });
          });
          //Updating the policy with the new weakness id that was made
          let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idWeaknesses`,{"nudgid":this.id, "data" :this.weaknessList})
          temp2.subscribe();



          
        });

      });
      
  });
    //STANDARDS STUFF
    this.standards$ = this.fetchAllStandards();
    this.rest_service.standardEmit.subscribe(element => {

      let temp = this.rest_service.post(`http://192.168.0.70:3000/standards/${this.id}/${this.loginInfo.CompanyName}`, {"Standard" : element})
      .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
      temp.subscribe(async element=> {
        this.standardsList = []

        //Adding Control that was just created.
        this.standardsList.push(element.insertId)
        //Getting idControl field of current policy.
        let ctrlSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idStandards`)
        ctrlSub.forEach(async dataArray => {
          dataArray.forEach(element => {
            //Converting String of "[id1,id2,id3]" to a real array
            let control_ids =  element.idStandards.trim().replace("\[","").replace("\]","").split(",")
            control_ids.forEach(id => {
              //Adding ids from policy to temp array
              this.standardsList.push(Number(id))
            });
          });
          //Updating the policy with the new control id that was made
          console.log("list being sent : " , this.standardsList)
          let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idStandards`,{"nudgid":this.id, "data" :this.standardsList})
          temp2.subscribe();
        });

      });
    });


    //This block below handles most of the gap interactions with the database
    this.gapSubscription = this.gapservice.onClick.forEach(async incomingData=>{
      //the optional param is added when NewDate is toggled on the Gap component
      //its defualt is false, if nothing is given. This makes sure new dates are 
      //posted to, and not updated to (which would fail because it wouldnt exist)
      if (incomingData.data.idOrgGap && !incomingData.optionalParam){
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
      //The below block will execute on data that was checked to be imported to controls/weaknesses
      if (incomingData.data.toImport){
        console.log("Importing")
        console.log("inc : " , incomingData)
        //Import the gap question as a control
        if(incomingData.data.Ganswer == "Yes"){
          let object ={
            Nid:this.id,
            idStandards : "",
            Cname : "FromGap",
            Coverview : incomingData.data.Gquestion +" -"+incomingData.data.Ganswer,
            Cissuedate : incomingData.data.Gdate,
            Csharedresources : "",
            Curl : "",
            CProcedure : "",
            idOrgWeaknesses : "",
            CompanyName : this.loginInfo.CompanyName
  
          }
            let temp = await this.controlsservice.post(object, this.loginInfo.CompanyName)
            .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
            temp.subscribe()
          

        }
        //Import the gap question as a weakness
        if(incomingData.data.Ganswer =="Weakness"){
          
          let object ={
  
            Nid : this.id,
            Wname : "From Gap",
            WdetectionDate : incomingData.data.Gdate,
            WvendorDependency: "",
            WriskRating : "",
            WriskAdjustment : "",
            WadjustedRiskRating : "",
            Standards : "",
            WdetectionSource : "",
            WcompletionDate : "",
            WremediationPlan : "",
            WvendorsProduct : "",
            WautoApprove: "",
            WoperationReq : "Pending",
            Wstatus : "Incomplete",
            WassetID : "",
            WlastChange : incomingData.data.Gdate,
            Wdescription : incomingData.data.Gquestion +" -No",
            WlastVendorCheck : "",
            WdeviationRationale : "",
            WfalsePositive : "Pending",
            WpointOfContact : "",
            WresourceReq : "",
            WsupportingDoc : "",
            Milestones : "",
            idOrgControls : "",
            CompanyName : this.loginInfo.CompanyName
  
          }
          let temp = await this.rest_service.post(`http://192.168.0.70:3000/weaknesses/${this.id}/${this.loginInfo.CompanyName}`,object)
          .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));
          temp.subscribe()
        }

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

  public populateControlForm(){
     let temp = document.getElementById("")
  }



  public filterControls()
  {
    //by updating search, the html data binding updates and the filter is automatically applied.
    this.searchControls = (<HTMLInputElement>document.getElementById("searchControls")).value.toLowerCase()
  }


  debug(){
    console.log(this.guidelines$)
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
    policy.Comments = Comments
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
  async deleteControls(id: any): Promise<void> {

    let CompanyName = this.loginInfo.CompanyName
    this.ctrlList = []

    let temp = this.rest_service.delete(`http://192.168.0.70:3000/controls/${id}/${CompanyName}`)
    .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
    temp.subscribe()

    
    let ctrlSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idControls`)
    ctrlSub.forEach(async dataArray => {
      dataArray.forEach(element => {
        //Converting String of "[id1,id2,id3]" to a real array
        let control_ids =  element.idControls.trim().replace("\[","").replace("\]","").split(",")
        control_ids.forEach(id => {
          //Adding ids from policy to temp array
          this.ctrlList.push(Number(id))
        });
      });
      //Remove the correct control

      let index = this.ctrlList.indexOf(id)
      if (index != -1){
        this.ctrlList.splice(this.ctrlList.indexOf(id), 1)
      }


      let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idControls`,{"nudgid":this.id, "data" :this.ctrlList})
      temp2.subscribe();
    });

  }
  












  fetchAllWeaknesses(Nid: any) {
    return this.weaknessservice.fetchAll(Nid, this.loginInfo.CompanyName);
  }

  updateWeaknesses(id: number, inventoryItem: Partial<weaknesses>): void {
  /*
    this.weaknesses$ = this.weaknessService
      .update(newWeakness)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));*/
  }
  async deleteWeaknesses(id: any): Promise<void> {
    let CompanyName = this.loginInfo.CompanyName
    this.weaknessList = []

    this.weaknesses$ = this.weaknessservice
      .delete(id,this.loginInfo.CompanyName)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses(this.id))));

      let weaknessSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idWeaknesses`)
      weaknessSub.forEach(async dataArray => {
        dataArray.forEach(element => {
          //Converting String of "[id1,id2,id3]" to a real array
          let control_ids =  element.idWeaknesses.trim().replace("\[","").replace("\]","").split(",")
          control_ids.forEach(id => {
            //Adding ids from policy to temp array
            this.weaknessList.push(Number(id))
          });
        });
        //Remove the correct control

        let index = this.weaknessList.indexOf(id)
        if (index != -1){
          this.weaknessList.splice(this.weaknessList.indexOf(id), 1)
        }
  
  
        let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idWeaknesses`,{"nudgid":this.id, "data" :this.weaknessList})
        temp2.subscribe();
      });


      
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

    this.standardsList = []

    let standardSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idStandards`)
    standardSub.forEach(async dataArray => {
      dataArray.forEach(element => {
        //Converting String of "[id1,id2,id3]" to a real array
        let standard_ids =  element.idStandards.trim().replace("\[","").replace("\]","").split(",")
        standard_ids.forEach(id => {
          //Adding ids from policy to temp array
          this.standardsList.push(Number(id))
        });
      });
      //Remove the correct control
      let index = this.standardsList.indexOf(id)
      if (index != -1){
        this.standardsList.splice(this.standardsList.indexOf(id), 1)
      }


      let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idStandards`,{"nudgid":this.id, "data" :this.standardsList})
      temp2.subscribe();
    });
     
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

  openMilestones(idOrgWeaknesses,Nid){
    let dialogRef = this.dialog.open(MilestoneFormComponent, {
      width: '2400px',
      height: '800px',
      autoFocus : false,
      data: {
        idOrgWeaknesses,
        Nid
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
      value = value.toLowerCase()
      this.NidFilterList.forEach(element => {
        if (value){
          this.NidDisplayList$ = element.filter(x=>x.nudgid.toLowerCase().includes(value))
          return element.filter(x=> x.nudgid.toLowerCase().includes(value))
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

  stringToArray(input){
    //console.log("input : " ,  input)
    // "[123,646,2,25]"
    let temp = input.trim().replace("\[","").replace("\]","").split(",")

    return input

  }

  ngOnDestroy(){
   // this.gapSubscription.unsubscribe()
    this.controlSubscription.unsubscribe()
  }

}