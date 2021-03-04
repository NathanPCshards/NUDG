import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
//const io = require("socket.io-client");
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{
  //socket = io('http://localhost:4200');  
  //
  submitted = false;
  loginForm;
  results;// = res.json();
  

  constructor(private http: HttpClient, private formBuilder: FormBuilder){
    //  this.socket.emit('test', 'bababooeee')
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username : "",
      password : "",
    });
  }
  public onFormSubmit() {
   // this.socket.emit('test' , 'login form message')
    /*
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    this.http.post(configUrl,this.loginForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);*/
 }


}