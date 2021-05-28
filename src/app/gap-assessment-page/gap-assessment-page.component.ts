import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { login } from '../injectables';
import { gap } from '../models/gap';
import { GapService } from '../services/gap.service';

import { restAPI } from '../services/restAPI.service';
import { SharedService } from '../services/Shared';

@Component({
  selector: 'app-gap-assessment-page',
  templateUrl: './gap-assessment-page.component.html',
  styleUrls: ['./gap-assessment-page.component.scss']
})
export class GapAssessmentPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



@Component({
  selector: 'gap-form',
  templateUrl: './gapForm.html',
  styleUrls: ['./gap-assessment-page.component.scss']
})
export class GapForm implements OnInit{
  //Holds information from database
  gap$: Observable<gap[]>;
  displayList$;
  //Temporary list of items to delete in DB
  toDeleteList = [];
  //Inputs passed from identifier page to policy accordion to here.
  @Input()
  id$;
  @Input()
  displayDate$;
  //hold date input by user ()
  dateField$;
  @Input()
  parentReference$;
  //saving the nist reference of the gap questions
  Greference$;
  //HTML button Toggles
  showComments = true;
  editing = false;
  newDate = false;
  //To pull url information
  routeSub
  nudgid;


  //For filtering and Drop down menus
  NidFilter$;
  uniqueNidList$;
  uniqueDateList$;
  dateFilter$;
  NidDisplayList$;
  DateDisplayList$;
  NidFilterList = []
  DateFilterList = []

  counts = []
  gapStatus = null


  

  
  policyForm: FormGroup = this.formBuilder.group({
    NidFilterList : []
  });
  dateForm: FormGroup = this.formBuilder.group({
    DateFilterList:  []
  });

    constructor(
    private http:HttpClient, 
    private formBuilder: FormBuilder,
    private gapservice : GapService,
    private route: ActivatedRoute,
    private loginInfo : login,
    public router: Router,
    public sharedService: SharedService,
    private rest_service: restAPI
    ) { }
  
  ngOnInit(){
    //Pulling id and date from URL parameters
    this.routeSub = this.route.params.subscribe(params => {
      this.id$ = params['id'];
      this.displayDate$ = params['Date']
  
      });

    
   //If no date is given set date to defualt : 1/1/2021
   //otherwise Gdate is initialized through input parameters (passed from identifier page to accordion to here)
    if(!this.displayDate$){
      this.displayDate$ = "1/1/2021"
    }
    if(!this.id$){
      this.id$ = "AC-N.01"
    }

    this.loadData()
   

  }

  async loadData(){
     //Initializing unique lists (Used for dropdown displays)
     this.uniqueNidList$= this.rest_service.get(`http://192.168.0.70:3000/gap/${'None'}/${this.loginInfo.CompanyName}/?getUniqueNids=${true}`)
     this.uniqueDateList$ = this.rest_service.get(`http://192.168.0.70:3000/gap/${'None'}/${this.loginInfo.CompanyName}/?getUniqueDates=${true}`)

     this.counts = []
     await this.getCounts().then( data =>{
      this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id$}/${this.loginInfo.CompanyName}?UpdateGapStatus=true`,{GapStatus : this.gapStatus}).subscribe()
     })
    

     //Applying Filters
     this.dateFilter$ = this.dateForm.get('DateFilterList')!.valueChanges
     .pipe(
       startWith(''),
       map(value=> this._filterDates(value))
     )
     this.NidFilter$ = this.policyForm.get('NidFilterList')!.valueChanges
     .pipe(
       startWith(''),
       map(value=> this._filterNid(value))
     )
  
     //leave here for some reason, its important
     this.NidFilter$.forEach(element => {
     });
     this.dateFilter$.forEach(element => {
       
     });
 
     //Unique Lists
     this.uniqueNidList$.forEach(element => {
       this.NidFilterList.push(element)
     });
     this.uniqueDateList$.forEach(element => {
       this.DateFilterList.push(element)
     });
 
     //Gap -- First refresh call is to initialize Gap$ and the display list
     this.refreshGapAndDisplayList();
     this.sharedService.refreshRequest.subscribe(e =>{
     
       this.refreshGapAndDisplayList();
     })
  }
  

  ngAfterViewInit(){
      //initializing edit controls to be off
      this.editing = false;
      document.getElementById("qToggleIcon").innerText = "check_box_outline_blank"
      for (let index = 0; index < document.getElementsByClassName("editToggle").length; index++) {
        let element = <HTMLInputElement>document.getElementsByClassName("editToggle").item(index)
        element.disabled = true        
      }
  }

  getid$(): string { return this.id$; }
  setid$(id$: string) { this.id$ = (id$);}


  async getCounts(){
   //Determining and updating policy's gap status by getting counts of it's gap question's answers
    this.gapStatus = null
    var sub1;
    var sub2;
    var sub3;

    sub1 = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id$}/${this.loginInfo.CompanyName}/?CountWeaknesses=${true}`).forEach(data=>{
      data.forEach(dataArray => {
        this.counts.push(["Weaknesses",dataArray['COUNT(Ganswer)']])  
      });
    })
   sub2 = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id$}/${this.loginInfo.CompanyName}/?CountPartial=${true}`).forEach(data=>{
   data.forEach(dataArray => {  
     this.counts.push(["Partial",dataArray['COUNT(Ganswer)']])  
    });
  })
   sub3 = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id$}/${this.loginInfo.CompanyName}/?CountYes=${true}`).forEach(data=>{
   data.forEach(dataArray => {  
     this.counts.push(["Yes",dataArray['COUNT(Ganswer)']])  
    });
  })
  
  this.counts.forEach(element => {
     let key = element[0]
     let value = element[1]
   //Rules here
   //Any answer weakness : Weakness
   //Any answer Partial : Partial
   //All answers 'Yes' : Ready
   if (key =="Yes" && value >= 1 && this.gapStatus == null){
     this.gapStatus = "Ready"
   }
   if (key =="Partial" && value >= 1 && this.gapStatus == null){
     this.gapStatus = "In Progress"

   }
   if (key =="Weaknesses" && value >= 1 && this.gapStatus == null){
     this.gapStatus = "Deficient"
   }

  });

     return this.counts
  }




  toggleWeaknessImport(){
    if (document.getElementById("wToggleIcon").innerText == "check_box"){
      document.getElementById("wToggleIcon").innerText = "check_box_outline_blank"
    }
    else{
      document.getElementById("wToggleIcon").innerText = "check_box"

    }
  }

  toggleNewDate(){
    if (document.getElementById("dateToggleIcon").innerText == "check_box"){
      this.newDate = false;
      document.getElementById("dateToggleIcon").innerText = "check_box_outline_blank"
    }
    else{
      this.newDate = true;
      document.getElementById("dateToggleIcon").innerText = "check_box"

    }
  }

  toggleQuestionEdit(){
    if (document.getElementById("qToggleIcon").innerText == "check_box"){
      this.editing = false;
      document.getElementById("qToggleIcon").innerText = "check_box_outline_blank"
      for (let index = 0; index < document.getElementsByClassName("editToggle").length; index++) {
        let element = <HTMLInputElement>document.getElementsByClassName("editToggle").item(index)
        element.disabled = true        
      }
    }
    else{
      document.getElementById("qToggleIcon").innerText = "check_box"
      this.editing = true;
      for (let index = 0; index < document.getElementsByClassName("editToggle").length; index++) {
        let element = <HTMLInputElement>document.getElementsByClassName("editToggle").item(index)
        element.disabled = false        
      }
    }
  }

  toggleComment(){
    if (document.getElementById("commentToggleIcon").innerText == "check_box"){
      this.showComments = true

      document.getElementById("commentToggleIcon").innerText = "check_box_outline_blank"
    
     
    }
    else{
      this.showComments = false

      document.getElementById("commentToggleIcon").innerText = "check_box"
    

    }
  }

  toggleControlImport(){
    if (document.getElementById("cToggleIcon").innerText == "check_box"){
      document.getElementById("cToggleIcon").innerText = "check_box_outline_blank"
    }
    else{
      document.getElementById("cToggleIcon").innerText = "check_box"

    }
  }

  importToggle(entry,event){
    if (this.editing){
      let object = event.target
      if (object.innerText == "check_box"){
        object.innerText = "check_box_outline_blank"
        entry.toImport = false
      }
      else{
        object.innerText = "check_box"
        entry.toImport = true
      }
    }

  }

  fetchAllGap(Nid:any, Gdate: any): Observable<gap[]> {
    let tempUrl;
    if (Gdate != "") {
      //if date is given
      tempUrl = `http://192.168.0.70:3000/gap/${Nid}/${this.loginInfo.CompanyName}/?Gdate=${Gdate}`
    }
    else{
      tempUrl = `http://192.168.0.70:3000/gap/${Nid}/${this.loginInfo.CompanyName}`
    }
    return this.rest_service.get(tempUrl);
  }

  delete(id: any): void {
    let tempUrl = `http://192.168.0.70:3000/gap/${id}/${this.loginInfo.CompanyName}`
    let sub = this.rest_service.delete(tempUrl)
    sub.subscribe()
    //  this.gap$ = this.rest_service.delete(id)    
  }


    //So ultimately what happens here is data is pulled from DB and stored in uniqueNids
    //In onit, we parse it and make a copy called NidFilterList
    //Here, we filter the display list and copy the results into observable NidDisplayList$
    //and thats linked to be shown in the html
    //this function is updated when Nid field is typed in.
  _filterNid(value: string){
    value = value.toLowerCase()
  this.NidFilterList.forEach(element => {
   
    if (value){
      this.NidDisplayList$ = element.filter(x=>x.Nid.toLowerCase().includes(value))
      return element.filter(x=> x.Nid.toLowerCase().includes(value))
    }
      this.NidDisplayList$ = element
      return element

  });
  
  }

  _filterDates(value: string){
    value = value.toLowerCase()
    this.dateField$ = value
    this.DateFilterList.forEach(element => {
      if (value){
        this.DateDisplayList$ = element.filter(x=>x.Gdate.toLowerCase().includes(value))
        return element.filter(x=> x.Gdate.toLowerCase().includes(value))
      }
        this.DateDisplayList$ = element
        return element

    });

}
  

  //TODO Maybe combine these functions later
  public setNid(event: any, name : any, date:any)
  {
    this.id$ = name
    if (this.parentReference$){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["Policy/",String(name).trim() ,String(date).trim()]));
    }
    else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["GapForm/",String(name).trim() ,String(date).trim()]));
    }
    
  }

  public setDate(event: any, date:any, name : any)
  {
    if (this.parentReference$){
     this.displayDate$ = date
     this.loadData()
    }
    else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["GapForm/",String(name).trim() ,String(date).trim()]));
    }
  }

  public submitGap(){
    //When submit button is pressed
    //This goes to identifier page ngOnInit, where gapservice post, update and delete are processed.
    let submitCount = {}
    submitCount["Yes"] = 0
    submitCount["Partial"] = 0
    submitCount["Weakness"] = 0

    this.displayList$.forEach(element => {
      
      submitCount[element.Ganswer] += 1
      
      if (this.dateField$ && this.newDate){
        
        element.Gdate = this.dateField$
        //by adding newdate as a parameter, the if statment in identifier page will post instead of updating
        //regardless of what the newDate actually is (but above we update the data accordingly)
        this.gapservice.emit(element,this.newDate)
      }
      else{
        this.gapservice.emit(element,false)
      }

    });
    this.toDeleteList.forEach(element => {
      //we also have to emit the entries that are pending deletion
      this.gapservice.emit(element[0].idOrgGap)
    });
    this.toDeleteList = [] //We clear the 'to delete' list here because the DB is once again Synced

  
    if (submitCount["Weakness"] >= 1){
      this.gapStatus = "Weakness"
    }
    else if(submitCount["Partial"] >= 1){
      this.gapStatus = "In Progress"
    }
    else{
      this.gapStatus = "Ready"
    }
 
  
   console.log("Ending with a : " , this.gapStatus)

    
  }

  public deleteEntry(index:any){
     if(this.editing){
      let objectToDelete = this.displayList$.splice(index,1)
      this.toDeleteList.push(objectToDelete)
    }
  }

  public onAnswerChange(i:any, data:any){
    this.displayList$[i].Ganswer = data;
    console.log(this.displayList$)
  }
  public onQuestionChange(i:any, data:any){
    this.displayList$[i].Gquestion = data;
  }
  public onCommentChange(i:any, data:any){
    this.displayList$[i].Gcomment = data;
  }

  public addQuestion(){
    let temp = {
      Nid:  this.id$,
      Gdate: this.displayDate$,
      Gquestion : "",
      Ganswer : "",
      Gcomment : "",
      CompanyName : this.loginInfo.CompanyName
  }
    this.displayList$.push(temp)
  }

  public async refreshGapAndDisplayList(){
    //this function does what it says
    this.gap$ = await this.fetchAllGap(this.id$, this.displayDate$);
    this.gap$.forEach(element => {
      this.displayList$ = []
      element.forEach(element2 => {
        this.displayList$.push(element2)
        this.Greference$ = element2.Greference
      });
    });

  }

  public addDate(){






    let temp = {
      Nid:  this.id$,
      Gdate: this.dateField$,
      Gquestion : "",
      Ganswer : "",
      Gcomment : "",
      CompanyName : this.loginInfo.CompanyName
  }
  this.gapservice.emit(temp)
  }



}

