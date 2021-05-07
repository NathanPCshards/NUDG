import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { SharedService } from './../services/Shared';
import { MatDialog } from '@angular/material/dialog';
import { roles } from '../models/roles';
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { UserServiceService } from '../services/user-service.service';

 
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


  constructor(private http:HttpClient, 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    private sharedService: SharedService,
    private roleservice: RolesService,
    private userservice : UserServiceService) {


   }

  public openDialog() {
    this.dialog.open(roleDialog, {height:'56%', width:"80%"});
  }

  ngOnInit(){
    this.roles$ = this.roleservice.fetchAll();
    this.sharedService.onClick.subscribe(async roleObject=>{
      await this.roleservice.post(roleObject).toPromise()
      this.roles$ = this.roleservice.fetchAll();
    })




  }
  ngAfterViewInit(){


  }


 

  post(userItem: Partial<roles>): void {
  }


  update(id: number, userItem: Partial<roles>): void {
    const name = (<any>userItem).trim();
    
    if (!name) return;
/*
    const newroles: roles = {
      id,
      name

    };

    this.roles$ = this.roleservice
      .update(newroles)
      .pipe(tap(() => (this.roles$ = this.fetchAll())));*/
  }


  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)

    this.roles$ = this.roleservice
      .delete(id)
      .pipe(tap(() => (this.roles$ = this.roleservice.fetchAll())));
      
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
    private userservice : UserServiceService,
    private sharedSerivce : SharedService) { }

ngOnInit(){
    //Getting Users 
    this.users$ = this.userservice.fetchAll()

}
submit(URGroles, Rroletype, Rdescription, URGusers){

  this.sharedSerivce.emit({URGroles, Rroletype, Rdescription, URGusers})

}


}
