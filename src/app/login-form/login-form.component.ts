import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { login } from '../injectables';
import { LoginService } from '../services/loginService';

//const io = require("socket.io-client");
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent{
  test$;


  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder,
    private loginservice : LoginService,
    public loginInfo : login

    ){

  }

  ngOnInit(){
    //clearing global vars
    this.loginInfo.token = ""
    this.loginInfo.userId = ""
    this.loginInfo.CompanyName = ""


  }

  loginSkip(){
    this.loginInfo.CompanyName = `PCshards`
  }


  async login(Username, password){
    this.test$ = await this.loginservice.Login({Username, password})
    this.test$.subscribe()
    this.test$.forEach(element => {
      //setting global vars (this is in providers for shared Module, and is imported to each component in their own module [providers])
      this.loginInfo.token = element.token
      this.loginInfo.userId = element.userId
      this.loginInfo.CompanyName = element.CompanyName


    });


  }



}