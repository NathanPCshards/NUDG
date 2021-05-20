import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';

import { restAPI } from '../services/restAPI.service';


@Component({
  selector: 'app-software-approval-form',
  templateUrl: './software-approval-form.component.html',
  styleUrls: ['./software-approval-form.component.scss']
})
export class SoftwareApprovalFormComponent implements OnInit {
inventory$;
users$;
roles$;
groups$;
software$
vendors$

panelOpenState = false;

    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private rest_service : restAPI,
      private loginInfo : login,
       ) { }
  
  ngOnInit(){
    //Loading Data
    this.software$ = this.fetchall()
    this.vendors$ = this.rest_service.get(`http://localhost:3000/vendors/${this.loginInfo.CompanyName}`);
    this.inventory$ = this.rest_service.get(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`);
    this.users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
 
    this.roles$ = this.rest_service.get(`http://localhost:3000/roles/${this.loginInfo.CompanyName}`);
    this.groups$ = this.rest_service.get(`http://localhost:3000/groups/${this.loginInfo.CompanyName}`);


  }
  fetchall(){
    return this.rest_service.get(`http://localhost:3000/softwareApproval/${this.loginInfo.CompanyName}`)
  }

   async submit(SWname , SWSupplierInformation , SWdescription , SWinstallDate , 
    SWinstallPath , SWtype , SWdateApproved , SWplatform, SWversion , SWpatchNum , SWupdateSchedule , SWmanualReviewDate , 
    SWautomaticUpdateDate , SWinternetReq , SWlegacy , SWelevatedPrivileges , SWvulnerabilities , SWusers , SWgroups , SWroles ,
     SWassetIdentifier , SWvendor ){

      //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
      SWinstallDate    = SWinstallDate ? SWinstallDate : ""
      SWtype           = SWtype ? SWtype : ""
      SWplatform       = SWplatform ? SWplatform : ""
      SWupdateSchedule = SWupdateSchedule ? SWupdateSchedule : ""
      SWmanualReviewDate= SWmanualReviewDate ? SWmanualReviewDate : ""
      SWautomaticUpdateDate= SWautomaticUpdateDate ? SWautomaticUpdateDate : ""
      SWdateApproved    = SWdateApproved ? SWdateApproved : ""
      SWusers          = SWusers ? SWusers : ""
      SWgroups         = SWgroups ? SWgroups : ""
      SWroles          = SWroles ? SWroles: ""
      SWassetIdentifier= SWassetIdentifier ? SWassetIdentifier : ""



      let data = {SWname , SWSupplierInformation , SWdescription , SWinstallDate , 
        SWinstallPath , SWtype , SWdateApproved , SWplatform, SWversion , SWpatchNum , SWupdateSchedule , SWmanualReviewDate , 
        SWautomaticUpdateDate , SWinternetReq , SWlegacy , SWelevatedPrivileges , SWvulnerabilities , SWusers , SWgroups , SWroles ,
         SWassetIdentifier , SWvendor }
                                            
         let temp = await this.rest_service.post(`http://localhost:3000/softwareApproval/${this.loginInfo.CompanyName}`, data)
       //  .pipe(tap(() => (this.software$ = this.fetchall())));

         temp.subscribe()
         this.software$ = this.fetchall()

  }

  async delete(id : any){
    //Delete Entry
    let temp = this.rest_service.delete(`http://localhost:3000/softwareApproval/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.software$ = this.fetchall())));

    temp.subscribe()

  }

  }
  