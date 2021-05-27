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
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

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

  Uremoteuser$
  UGRroles$
  Iassetidentifier$ 
  UGRgroups$
  Uemptype$
  Ucuidata$
  UcuiContract$





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
    this.CUIcontracts$ = this.rest_service.get(`http://192.168.0.70:3000/cuicontracts/${this.loginInfo.CompanyName}`);
    console.log("check : " , typeof(this.CUIcontracts$))
    this.Inventory$ = this.rest_service.get(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`);
    this.Roles$ = this.rest_service.get(`http://192.168.0.70:3000/roles/${this.loginInfo.CompanyName}`);
    this.Groups$ = this.rest_service.get(`http://192.168.0.70:3000/groups/${this.loginInfo.CompanyName}`)

    this.panelOpenState = false;

  }
 
  fetchAll(): Observable<Users[]> {

    return this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
  }

  post(Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, UGRgroups, UGRroles, Iassetidentifier, UcuiContract): void {
    
    //The mat form fields will not send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    Uemptype  = Uemptype ? Uemptype : ""
    Uhiredate = Uhiredate ? Uhiredate : ""
    Ucuidata  = Ucuidata ? Ucuidata : ""
    Uremoteuser = Uremoteuser ? Uremoteuser : ""
    UGRgroups = UGRgroups ? UGRgroups : ""
    UGRroles  = UGRroles ? UGRroles : ""
    Iassetidentifier  = Iassetidentifier ? Iassetidentifier : ""
    UcuiContract  = UcuiContract ? UcuiContract : ""


    let data = { Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, UGRgroups, UGRroles, Iassetidentifier, UcuiContract }
    let temp = this.rest_service
      .post(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.users$ = this.fetchAll())));


      temp.subscribe()

      }


  update(Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, UGRgroups, UGRroles, Iassetidentifier, UcuiContract, idOrgUsers): void {
    Uemptype  = Uemptype ? Uemptype : ""
    Uhiredate = Uhiredate ? Uhiredate : ""
    Ucuidata  = Ucuidata ? Ucuidata : ""
    Uremoteuser = Uremoteuser ? Uremoteuser : ""
    UGRgroups = UGRgroups ? UGRgroups : ""
    UGRroles  = UGRroles ? UGRroles : ""
    Iassetidentifier  = Iassetidentifier ? Iassetidentifier : ""
    UcuiContract  = UcuiContract ? UcuiContract : ""
    
    let data = { Ufname, Ulname, Uempid, Uemptype, Ujobtitle, Ujobrole, Udepartment, Uhiredate, Ulogonhours, Uadditionalinfo, Udocumentupload, Uemail, Ubusinessphone, Ucellphone, Uaddress, Ucity, Ustate, Upostal, Ucountry, Ucompany, Uuserid, Ucuidata, Uremoteuser, UGRgroups, UGRroles, Iassetidentifier, UcuiContract, idOrgUsers}
    let temp = this.rest_service
      .update(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}` , data)
      .pipe(tap(() => (this.users$ = this.fetchAll())));
      temp.subscribe()
  }


  delete(Uuserid: any): void {

  let temp = this.rest_service
      .delete(`http://192.168.0.70:3000/orgusers/${Uuserid}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.users$ = this.fetchAll())));
    temp.subscribe()
      
  }

  populateForm(user){
    console.log("user : " , user)
    let temp = (<HTMLInputElement>document.getElementById("Ufname")).value = user.Ufname
    temp = (<HTMLInputElement>document.getElementById("Ulname")).value = user.Ulname
    temp = (<HTMLInputElement>document.getElementById("Uempid")).value = user.Uempid


    temp = (<HTMLInputElement>document.getElementById("Uemptype")).value = user.Uemptype
    this.Uemptype$ = user.Uemptype
    this.UGRroles$ = user.UGRroles 
    this.Iassetidentifier$ = user.Iassetidentifier 
    this.UGRgroups$ = user.UGRgroups 
    this.Ucuidata$ = user.Ucuidata 
    this.UcuiContract$ = user.UcuiContract
    this.Uremoteuser$ = user.Uremoteuser


    temp = (<HTMLInputElement>document.getElementById("Ujobtitle")).value = user.Ujobtitle
    temp = (<HTMLInputElement>document.getElementById("Ujobrole")).value = user.Ujobrole
    temp = (<HTMLInputElement>document.getElementById("Udepartment")).value = user.Udepartment
    temp = (<HTMLInputElement>document.getElementById("Uhiredate")).value = user.Uhiredate
    temp = (<HTMLInputElement>document.getElementById("Ulogonhours")).value = user.Ulogonhours
    temp = (<HTMLInputElement>document.getElementById("Uadditionalinfo")).value = user.Uadditionalinfo
    //temp = (<HTMLInputElement>document.getElementById("Udocumentupload")).value = user.Udocumentupload
    temp = (<HTMLInputElement>document.getElementById("Uemail")).value = user.Uemail
    temp = (<HTMLInputElement>document.getElementById("Ubusinessphone")).value = user.Ubusinessphone
    temp = (<HTMLInputElement>document.getElementById("Ucellphone")).value = user.Ucellphone
    temp = (<HTMLInputElement>document.getElementById("Ucity")).value = user.Ucity
    temp = (<HTMLInputElement>document.getElementById("Ustate")).value = user.Ustate
    temp = (<HTMLInputElement>document.getElementById("Upostal")).value = user.Upostal
    temp = (<HTMLInputElement>document.getElementById("Ucountry")).value = user.Ucountry

    temp = (<HTMLInputElement>document.getElementById("Ucompany")).value = user.Ucompany
    temp = (<HTMLInputElement>document.getElementById("Uuserid")).value = user.Uuserid
    temp = (<HTMLInputElement>document.getElementById("Uremoteuser")).value = user.Uremoteuser


 




  }

  
  public onFormReset() {
  
  this.submitted = false;
  
  }
  }


