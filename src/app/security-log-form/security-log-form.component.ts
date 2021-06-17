import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-security-log-form',
  templateUrl: './security-log-form.component.html',
  styleUrls: ['./security-log-form.component.scss']
})
export class SecurityLogFormComponent implements OnInit {
  UserForm;
  submitted= false;
    constructor(private http:HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.UserForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
  
    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://192.168.0.70:3000/home'; 
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
  