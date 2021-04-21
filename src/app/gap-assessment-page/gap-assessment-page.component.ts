import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { gap } from '../models/gap';
import { GapService } from '../services/gap.service';

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





export interface Policy {
  level: string;
  names: string[];
}

export interface Date {
  date : string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};






@Component({
  selector: 'gap-form',
  templateUrl: './gapForm.html',
  styleUrls: ['./gap-assessment-page.component.scss']
})
export class GapForm implements OnInit{
  GapForm;
  submitted= false;
  UserForm: any;
  gap$: Observable<gap[]>;
  displayList$;
  resetListCopy;
  toDeleteList = [];
  @Input()
  id$;
  @Input()
  Gdate$;
  @Input()
  parentReference$;
  Greference$;
  showComments = true;
  routeSub
  editing = false;
  nudgid;



  NidFilter$;
  uniqueNidList$;
  uniqueDateList$;
  displayNidList = []
  displayDateList = []

  policyForm: FormGroup = this.formBuilder.group({
    NidFilter: '',
  });

  dateForm: FormGroup = this.formBuilder.group({
    dateControl: '',
  });

    constructor(
    private http:HttpClient, 
    private formBuilder: FormBuilder,
    public gapservice : GapService,
    private route: ActivatedRoute,
    public router: Router
    ) { }
  
  ngOnInit(){

    this.routeSub = this.route.params.subscribe(params => {
      this.id$ = params['id'];
      this.Gdate$ = params['Date']
  
      });




   //If no date is given set date to defualt : 1/1/2021
    if(!this.Gdate$){
      this.Gdate$ = "1/1/2021"
    }

    //TODO Set up date field to route to whatever is typed it.
    //Setup filtering for both
    //Check logic for posting/updating...
    //Getting unintended duplicate behavior in DB
    



    this.uniqueNidList$= this.gapservice.getUniqueNids();
    this.uniqueDateList$ = this.gapservice.getUniqueDates()





    //Filtering Nid list by input field
    this.NidFilter$ = this.policyForm.get('NidFilter')!.valueChanges
    .pipe(
      startWith(''),
      map(value=> this._filterNid(value))
    )

    /*
    this.Gdate$ = this.dateForm.get('dateControl')!.valueChanges
    .pipe(
      map(value=>console.log(value))
    )*/
 
    //leave here for some reason, its important
    this.NidFilter$.forEach(element => {
     // console.log('element : ', element)
    });














    this.gap$ = this.fetchAllGap(this.id$, this.Gdate$);

    this.gap$.forEach(element => {
      this.displayList$ = []
      element.forEach(element2 => {
        this.displayList$.push(element2)
        this.Greference$ = element2.Greference
      });
      this.resetListCopy = this.displayList$

    });

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

  toggleWeaknessImport(){
    if (document.getElementById("wToggleIcon").innerText == "check_box"){
      document.getElementById("wToggleIcon").innerText = "check_box_outline_blank"
    }
    else{
      document.getElementById("wToggleIcon").innerText = "check_box"

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

  fetchAllGap(Nid:any, Gdate: any): Observable<gap[]> {
    return this.gapservice.fetchAll(Nid,Gdate);
  }

  delete(id: any): void {
      this.gap$ = this.gapservice
      .delete(id)    
  }


    _filterNid(value: string){
    console.log("value  " , value)
    console.log("display Nid list : " , this.displayNidList)

    return this.displayNidList[0]
    //if (value) {
    //  return this.displayNidList
      //  .map()
      //  .filter();
    }

   // return this.uniqueNidList$;


  private _filterDates(value: string): any {
    
    if (value) {
      return this.displayDateList
        .map(group => ({level: group.date, date: _filter(group.date, value)}))
        .filter(group => group.date.length > 0);
    }
    return this.uniqueDateList$;
  }
  

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

  public setDate(event: any, name : any)
  {
    let date = this.Gdate$
    console.log(this.Gdate$)
    if (this.parentReference$){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["Policy/",String(name).trim() ,String(date).trim()]));
    }
    else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["GapForm/",String(name).trim() ,String(date).trim()]));
    }
  }
  public submitGap(){
    //When submit button is pressed
    //This goes to identifier page ngOnInit, where gapservice post and update are called
    this.displayList$.forEach(element => {
        this.gapservice.emit(element)
    });
    this.toDeleteList.forEach(element => {
      this.gapservice.emit(element[0].idOrgGap)
    });

  }
  public deleteEntry(index:any){
    if(this.editing){
      let objectToDelete = this.displayList$.splice(index,1)
      this.toDeleteList.push(objectToDelete)
    }
  }

  public onAnswerChange(i:any, data:any){
    this.displayList$[i].Ganswer = data;
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
      Gdate: this.Gdate$,
      Gquestion : "",
      Ganswer : "",
      Gcomment : "",
  }
    this.displayList$.push(temp)
  }
}
