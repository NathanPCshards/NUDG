import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  displayText;

  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder,
    private loginservice : LoginService,
    public loginInfo : login,
    private router : Router

    ){

  }

  ngOnInit(){
    //clearing global vars
    //Commented out because it is annoying to sign in while working
    /*
    this.loginInfo.token = ""
    this.loginInfo.userId = ""
    this.loginInfo.CompanyName = ""
*/

  }

  loginSkip(){
    this.loginInfo.CompanyName = `PCshards`
    this.loginInfo.name = "Skipped Login"
  }


  async login(Username, password){
    this.test$ = await this.loginservice.Login({Username, password})
    this.test$.subscribe()
    this.test$.forEach(element => {
      //setting global vars (this is in providers for shared Module, and is imported to each component in their own module [providers])
      if(element === undefined){
        window.alert("Login Failed")
      }
      else{
     
        this.loginInfo.token = element.token
        this.loginInfo.userId = element.userId
        this.loginInfo.CompanyName = element.CompanyName
        this.loginInfo.name = element.name
        this.loginInfo.passwordLength = password.length
        this.loginInfo.email = element.email
        this.loginInfo.phone = element.phone
  
  
        window.alert("Account Sucessfully Logged Into")


        this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
    


        console.log("Login info : " , this.loginInfo)
      }
    

    });


  }



}