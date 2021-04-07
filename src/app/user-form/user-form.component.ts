import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../services/user-service.service';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
 // exampleDatabase: ExampleHttpDatabase | null;
  //filteredAndPagedIssues: Observable<GithubIssue[]>;
  users$: Observable<Users[]>;
  submitted= false;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  UserForm;
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  displayedColumns: string[] = ['idusersu','uname']

  constructor(private _httpClient: HttpClient, private formBuilder: FormBuilder, private userService: UserServiceService,){  }
 
  ngOnInit(){
    this.users$ = this.fetchAll();
    this.panelOpenState = false;

  }
 
  fetchAll(): Observable<Users[]> {
    return this.userService.fetchAll();
  }

  post(Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser): void {

    this.users$ = this.userService
      .post({ Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser })
      .pipe(tap(() => (this.users$ = this.fetchAll())));
      }


  update(Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, idOrgUsers): void {


    this.users$ = this.userService
      .update({ Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, idOrgUsers})
      .pipe(tap(() => (this.users$ = this.fetchAll())));
  }


  delete(Uuserid: any): void {
    console.log("attempting to delete id : " , Uuserid)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)

    this.users$ = this.userService
      .delete(Uuserid)
      .pipe(tap(() => (this.users$ = this.fetchAll())));
      
  }

  
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }
  }


