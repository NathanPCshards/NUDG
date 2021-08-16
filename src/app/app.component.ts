import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { login } from './injectables';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mySelect') mySelect: MatSelect;
  @ViewChild('afterMenu2') afterMenu2: MatMenuTrigger;
  @ViewChild('afterMenu3') afterMenu3: MatMenuTrigger;
  title = 'nudg';
  toolbar = document.getElementById("toolbar");
  height;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  
  rtpol= function (famType)  {
    if (famType == "all"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies'))


    }
    if (famType == "nist"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies/Nist'))

    }
    if (famType == "cmmc"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies/CMMC'))

    }
    
  }


  constructor(private http: HttpClient, private router: Router, private loginInfo:login){

  }

  ngOnInit(){
    //Setting the default login
    //Remove this later/ When you want to test login/instancing 
    this.loginInfo.CompanyName = "PCshards"
    this.loginInfo.name = "test"
    this.loginInfo.passwordLength = 8
    this.loginInfo.userId = "abc"
    this.loginInfo.phone =  "111 111 1111"
    this.loginInfo.email = "abc@gmail.com"
    this.loginInfo.password = "12341234"


  }

  debug(){
    console.log( 
      this.enteredButton,
      this.isMatMenuOpen,
      this.isMatMenu2Open )
  }

  menuTimer(event){
    console.log("event : " , event)
    let that = this
    setTimeout(function(){/*
      let aftermenu2 = this.document.getElementById("aftermenu2")
      aftermenu2.closeMenu()
    //  this.afterMenu3.closeMenu()*/
     }, 1000);

  }

  buttonEnter(event) {
    console.log("event :  " , event)
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  buttonLeave(event) {
    console.log("event :  " , event)
   
  }

}


