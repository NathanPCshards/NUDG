import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { MatPaginator } from '@angular/material/paginator';


import { restAPI } from '../services/restAPI.service';
import { login } from '../injectables';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  users$: Observable<Users[]>;
  submitted= false;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  UserForm;
  panelOpenState = false;
  CUIcontracts$
  Inventory$;
  Groups$;
  Roles$;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  displayedColumns: string[] = ['idusersu','uname']

  constructor(private _httpClient: HttpClient, 
    private formBuilder: FormBuilder, 
    private rest_service : restAPI,
    private loginInfo : login,




    ){  }
 
  ngOnInit(){
    this.users$ = this.fetchAll();
    this.CUIcontracts$ = this.rest_service.get(`http://localhost:3000/cuicontracts/${this.loginInfo.CompanyName}`);

    this.Inventory$ = this.rest_service.get(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`);
    this.Roles$ = this.rest_service.get(`http://localhost:3000/roles/${this.loginInfo.CompanyName}`);
    this.Groups$ = this.rest_service.get(`http://localhost:3000/groups/${this.loginInfo.CompanyName}`)

    this.panelOpenState = false;

  }
 
  fetchAll(): Observable<Users[]> {

    return this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
  }

  post(Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser): void {
    let data = { Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser }
    let temp = this.rest_service
      .post(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.users$ = this.fetchAll())));


      temp.subscribe()

      }


  update(Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, idOrgUsers): void {
    let data = { Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, idOrgUsers}

    let temp = this.rest_service
      .update(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}` , data)
      .pipe(tap(() => (this.users$ = this.fetchAll())));
      temp.subscribe()
  }


  delete(Uuserid: any): void {

  let temp = this.rest_service
      .delete(`http://localhost:3000/orgusers/${Uuserid}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.users$ = this.fetchAll())));
    temp.subscribe()
      
  }

  
  public onFormReset() {
  
  this.submitted = false;
  
  }
  }


