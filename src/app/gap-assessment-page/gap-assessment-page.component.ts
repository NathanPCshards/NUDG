import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
    constructor(private http:HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.UserForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
  
    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    /*
    this.http.post(configUrl,this.UserForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);*/
  }
  
  
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }

}