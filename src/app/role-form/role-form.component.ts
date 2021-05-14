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
    return this.rest_service.get(`http://localhost:3000/roles/${this.loginInfo.CompanyName}`);

  }
  async post(data){

    let temp = this.rest_service.post(`http://localhost:3000/roles/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.roles$ = this.fetchall())));

    temp.subscribe()


    this.roles$ = this.fetchall()
  }

  delete(id: any): void {

    let temp = this.rest_service
      .delete(`http://localhost:3000/roles/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.roles$ = this.fetchall())));
      temp.subscribe()
      
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
    this.users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);

}
  async submit(URGroles, Rroletype, Rdescription, URGusers){
  let data = {URGroles, Rroletype, Rdescription, URGusers}
  let temp = await this.rest_service.post(`http://localhost:3000/roles/${this.loginInfo.CompanyName}`, data)

  temp.subscribe()


 // this.roles$ = this.roleservice.fetchAll();
  //this.sharedSerivce.emit(data)

}


}
