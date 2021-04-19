import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
export class GapForm implements OnInit {
  GapForm;
  submitted= false;
  UserForm: any;
  gap$: Observable<gap[]>;
  displayList$;
  resetListCopy;
  @Input()
  id$;
  @Input()
  Gdate$;
  @Input()
  parentReference$;

  routeSub

  policyLevelOptions: Observable<Policy[]>;
  dateObservable$: Observable<Date[]>;

  policyForm: FormGroup = this.formBuilder.group({
    policyLevel: '',
  });

  dateForm: FormGroup = this.formBuilder.group({
    date: '',
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
  
  dates: Date[] = [{
    date:['4/15/2021', '4/16/2021', '4/17/2021', '4/18/2021', '4/19/2021']
  }]
  editing = false;
  nudgid;
    constructor(private http:HttpClient, 
    private formBuilder: FormBuilder,
    public gapservice : GapService,
    private route: ActivatedRoute,
    public router: Router) { }
  
  ngOnInit(){

    this.routeSub = this.route.params.subscribe(params => {
      this.id$ = params['id'];
      this.Gdate$ = params['Date']
  
      });
      //initializing edit controls to be off
      this.editing=false;
      for (let index = 0; index < document.getElementsByClassName("editToggle").length; index++) {
        let element = <HTMLInputElement>document.getElementsByClassName("editToggle").item(index)
        element.disabled = true        
      }

    //Sets defualt page to be AC-N.01
    this.id$ ? true : this.id$ = "AC-N.01"
    this.Gdate$ ? true : this.Gdate$ = "4/16/2021"

    this.policyLevelOptions = this.policyForm.get('policyLevel')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );





    this.dateObservable$ = this.dateForm.get('date')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterDates(value))
    );

  





    this.gap$ = this.fetchAllGap(this.id$, this.Gdate$);
    this.gapservice.onClick.subscribe(e=>{
      //  this.displayList$ = e
    })
    this.gap$.forEach(element => {
      this.displayList$ = []
      element.forEach(element2 => {
        
        this.displayList$.push(element2)

      });

    });
    this.resetListCopy = this.displayList$

  }
  public onFormSubmit() {

  }
  
  public onFormReset() {

  }

  getid$(): string { return this.id$; }
  setid$(id$: string) {
    this.id$ = (id$);
  }

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
      document.getElementById("commentToggleIcon").innerText = "check_box_outline_blank"
    
      for (let index = 0; index < document.getElementsByClassName("comment").length; index++) {
        let element = <HTMLBodyElement>document.getElementsByClassName("comment").item(index)
       
        element.style.visibility = "visible"
        
      }

    }
    else{
      document.getElementById("commentToggleIcon").innerText = "check_box"
      for (let index = 0; index < document.getElementsByClassName("comment").length; index++) {
        let element = <HTMLBodyElement>document.getElementsByClassName("comment").item(index)
        element.style.visibility = "hidden"
        
      }


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


  post(userItem: Partial<gap>): void {
    const name = (<string>userItem).trim();
    if (!name) return;
/*
    this.roles$ = this.roleservice
      .post({ name })
      .pipe(tap(() => (this.roles$ = this.fetchAll())));*/
  }


  update(id: number, userItem: Partial<gap>): void {
    const name = (<any>userItem).trim();
    
    if (!name) return;
/*
    const newroles: roles = {
      id,
      name

    };

    this.roles$ = this.roleservice
      .update(newroles)
      .pipe(tap(() => (this.roles$ = this.fetchAll())));*/
  }


  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
   /*

    this.gap$ = this.gapservice
      .delete(id)
      .pipe(tap(() => (this.gap$ = this.fetchAllGap(id))));*/
      
  }



  private _filterGroup(value: string): Policy[] {
    if (value) {
      return this.policyLevels
        .map(group => ({level: group.level, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.policyLevels;
  }

  private _filterDates(value: string): Date[] {
    if (value) {
      return this.dates
        .map(group => ({level: group.date, date: _filter(group.date, value)}))
        .filter(group => group.date.length > 0);
    }
    return this.dates;
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
  public setDate(event: any, name : any, date:any)
  {
    this.Gdate$ = date
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
    this.displayList$.forEach(element => {

        this.gapservice.emit(element)

    });
    console.log("list : " , this.displayList$)

  }
  public deleteEntry(index:any){
    if(this.editing){
      this.displayList$.splice(index, index+1)

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
