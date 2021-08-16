import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { SharedService } from './../services/Shared';

import { roles } from '../models/roles';
import { Observable } from 'rxjs';
import { restAPI } from '../services/restAPI.service';
import { login } from '../injectables';


 
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  rowSelected = false;
  roles$: Observable<roles[]>;
  value;
  results;
  panelOpenState = false;
  roleSubmitted = false;
  roleForm;
  users$

  Rroletype$
  URGusers$


  //displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  //'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];

  @ViewChild(MatSort) sort;

//NOTE roles currently does not post, idk why. When sent from project everything is console logged and it looks like it would work
//When sending from postman the server does not take in the body, which is also weird

  constructor(private http:HttpClient, 
    private formBuilder: FormBuilder, 
    private rest_service : restAPI,
    private loginInfo : login,
    private sharedSerivce : SharedService
) {


   }

  ngOnInit(){
    //Getting Users 
    this.users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.roles$ = this.fetchall()



  }

  async submit(URGroles, Rroletype, Rdescription, URGusers){
    
    //The mat form fields will not send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    URGroles = URGroles ? URGroles : ""
    Rroletype = Rroletype ? Rroletype : ""
    Rdescription = Rdescription ? Rdescription : ""
    URGusers = URGusers ? URGusers : ""
   
    let data = {URGroles, Rroletype, Rdescription, URGusers}
    let temp = this.rest_service.post(`http://192.168.0.70:3000/roles/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.roles$ = this.fetchall())));
    temp.subscribe()
  }

  fetchall(){
    return this.rest_service.get(`http://192.168.0.70:3000/roles/${this.loginInfo.CompanyName}`);

  }

  update(URGroles, Rroletype, Rdescription, URGusers, idOrgRoles){
    

    //The mat form fields will not send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    URGroles = URGroles ? URGroles : ""
    Rroletype = Rroletype ? Rroletype : ""
    Rdescription = Rdescription ? Rdescription : ""
    URGusers = URGusers ? URGusers : ""
    idOrgRoles = idOrgRoles ? idOrgRoles : ""

    let data = {URGroles, Rroletype, Rdescription, URGusers, idOrgRoles}

    console.log("URGusers : " ,URGusers)
    let temp =  this.rest_service.update(`http://192.168.0.70:3000/roles/${this.loginInfo.CompanyName}`, data)
    temp.subscribe(result=>{  
    })
    let that = this
    setTimeout(function(){ that.roles$ = that.fetchall();}, 100);
  }


  populateForm(data){
    console.log("user : " , data)
    let temp = (<HTMLInputElement>document.getElementById("URGroles")).value = data.URGroles
    temp = (<HTMLInputElement>document.getElementById("Rdescription")).value = data.Rdescription
  

    this.Rroletype$ = data.Rroletype
    this.URGusers$ = data.URGusers

  }


  delete(id: any): void {

    let temp = this.rest_service
      .delete(`http://192.168.0.70:3000/roles/${id}/${this.loginInfo.CompanyName}`)
      temp.subscribe(result=>{  
      })
      let that = this
      setTimeout(function(){ that.roles$ = that.fetchall();}, 100);
      
  }

}

