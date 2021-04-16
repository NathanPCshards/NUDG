import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  @Input()
  id$ ="AC-N.01"
  

  nudgid;
    constructor(private http:HttpClient, private formBuilder: FormBuilder, public gapservice : GapService) { }
  
  ngOnInit(){
    this.gap$ = this.fetchAllGap(this.id$);
    console.log("gap : " , this.gap$)

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
      document.getElementById("qToggleIcon").innerText = "check_box_outline_blank"
    }
    else{
      document.getElementById("qToggleIcon").innerText = "check_box"

    }
  }

  toggleComment(){
    if (document.getElementById("commentToggleIcon").innerText == "check_box"){
      document.getElementById("commentToggleIcon").innerText = "check_box_outline_blank"
      document.getElementById("comment").style.visibility = "visible"

    }
    else{
      document.getElementById("commentToggleIcon").innerText = "check_box"
      document.getElementById("comment").style.visibility = "hidden"

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

  fetchAllGap(Nid:any): Observable<gap[]> {
    return this.gapservice.fetchAll(Nid);
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
}