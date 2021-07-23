import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/loginService';

//const io = require("socket.io-client");
@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent{
  test;
  worked;

  constructor(private http: HttpClient, 
    private loginservice : LoginService
    ){

  }

  ngOnInit(){

  }

  register(name, Username, Phone, Email, CompanyName, password){
    this.test = this.loginservice.SignUp({name, Username, Email, password, Phone, CompanyName})
    this.test.subscribe(result=>{
      if(result != undefined){
        this.worked = true
        window.alert(result.message)

      }
      else{
        this.worked = false

      }
   
    })
  
    if (!this.worked){
      window.alert(`
      Failed to Register user. Check that: 
      Your password is at least 8 Characters in length
      Your Email is valid`)
    }

  }



}