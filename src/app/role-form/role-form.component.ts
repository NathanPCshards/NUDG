import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { SharedService } from './../services/Shared';
import { MatDialog } from '@angular/material/dialog';
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

  //displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  //'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];

  @ViewChild(MatSort) sort;

//NOTE roles currently does not post, idk why. When sent from project everything is console logged and it looks like it would work
//When sending from postman the server does not take in the body, which is also weird

  constructor(private http:HttpClient, 
    private formBuilder: FormBuilder, 
    private rest_service : restAPI,
    private loginInfo : login,
  
    public dialog: MatDialog, 
    private sharedService: SharedService,
) {


   }

  public openDialog() {
    this.dialog.open(roleDialog, {height:'56%', width:"80%"});
  }

  ngOnInit(){
    this.roles$ = this.fetchall()
    this.roles$.forEach(element => {
      console.log("element : " , element)
  });
    this.sharedService.onClick.subscribe(async roleObject=>{
      this.post(roleObject)
    })




  }
  ngAfterViewInit(){


  }

  fetchall(){
    return this.rest_service.get(`http://192.168.0.70:3000/roles/${this.loginInfo.CompanyName}`);

  }
  async post(data){


    let temp = this.rest_service.post(`http://192.168.0.70:3000/roles/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.roles$ = this.fetchall())));

    temp.subscribe()


    this.roles$ = this.fetchall()
  }

  delete(id: any): void {

    let temp = this.rest_service
      .delete(`http://192.168.0.70:3000/roles/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.roles$ = this.fetchall())));
      temp.subscribe()
      
  }

  ngOnDestroy(){
   // this.sharedService.onClick.unsubscribe()
  }

 

}


@Component({
  selector: 'RoleGroupForms',
  templateUrl: 'dialog1.html',
})
export class roleDialog {
  roleSubmitted = false;
  roleForm;
  users$

  constructor(private http:HttpClient, 
    private formBuilder: FormBuilder,
    private rest_service : restAPI,
    private loginInfo : login,
    private sharedSerivce : SharedService) { }

ngOnInit(){
    //Getting Users 
    this.users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);

}
  async submit(URGroles, Rroletype, Rdescription, URGusers){
    
  //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
  URGroles = URGroles ? URGroles : ""
  Rroletype = Rroletype ? Rroletype : ""
  Rdescription = Rdescription ? Rdescription : ""
  URGusers = URGusers ? URGusers : ""


  let data = {URGroles, Rroletype, Rdescription, URGusers}


 //Since the form/table are on seperate components we emit this back to the parent to post and reload
  this.sharedSerivce.emit(data)



}


}
