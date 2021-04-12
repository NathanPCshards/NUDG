import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nudg';
  toolbar = document.getElementById("toolbar");
  height;

  rtroles= function ()  {
    this.router.navigateByUrl('/Roles')
    
  }
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
  rtusers= function ()  {
    this.router.navigateByUrl('/Users')
    
  }
  rtinven= function ()  {
    this.router.navigateByUrl('/Inventory')
    
  }
  rtcompany= function ()  {
    this.router.navigateByUrl('/CompanyInfo')
    
  }
  rtpolic= function ()  {
    this.router.navigateByUrl('/Policy')
    
  }

  rtdash= function ()  {
    this.router.navigateByUrl('/Dashboard')
    
  }

  constructor(private http: HttpClient, private router: Router){
    // client-side
    
  }
  //socket stuff

  ngOnInit(){
    //here we want to connect to socket.io server
    /*
    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    })*/

  }
 

 

  // Code for when "Create user" button is pressed. Example for page routing
  post(){
     this.http.post<any>('http://localhost:4200/Policies', {username : 'temp username' , password : 'temp password'})
    .subscribe(next=> console.log(next));
  }
  toolbarMouseover(){
    console.log("MOUSE OVER");
    this.height = 40;
  }
  toolbarMouseleave(){
    console.log('mouse leave');
    this.height = 1;
  }

}


