import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//const io = require("socket.io-client");
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{

  constructor(private http: HttpClient, private formBuilder: FormBuilder){

  }

  ngOnInit(){

  }


  public onFormSubmit() {

 }


}