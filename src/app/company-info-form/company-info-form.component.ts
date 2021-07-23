import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { companyInfo } from '../models/companyInfo';
import { restAPI } from '../services/restAPI.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.scss']
})
export class CompanyInfoFormComponent {
  panelOpenState = false;
  companies$: Observable<companyInfo[]>;
  Users$;

  constructor(  

    private rest_service : restAPI,
    private loginInfo : login

  ) { }

  ngOnInit(){
    this.companies$ = this.fetchAll();
    this.Users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.Users$.subscribe()
    this.companies$.subscribe()


  }

  fetchAll(): Observable<companyInfo[]> {

    return this.rest_service.get(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`);
  }

   post(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber){
     //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
     CIprimaryPoC = CIprimaryPoC ? CIprimaryPoC : ""
     CISBAcertified = CISBAcertified ? CISBAcertified : ""
     CIbusinessType = CIbusinessType ? CIbusinessType : ""
     CIcmmcAuditDate = CIcmmcAuditDate ? CIcmmcAuditDate : ""
     CINISTauditorDate = CINISTauditorDate ? CINISTauditorDate : ""




   let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, CompanyName : this.loginInfo.CompanyName}

   let temp =  this.rest_service.post(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`,data)
   .pipe(tap(() => (this.companies$ = this.fetchAll())));
   temp.subscribe()
  }


   update(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo) {
  
    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    CIprimaryPoC = CIprimaryPoC ? CIprimaryPoC : ""
    CISBAcertified = CISBAcertified ? CISBAcertified : ""
    CIbusinessType = CIbusinessType ? CIbusinessType : ""
    CIcmmcAuditDate = CIcmmcAuditDate ? CIcmmcAuditDate : ""
    CINISTauditorDate = CINISTauditorDate ? CINISTauditorDate : ""

    
    let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo, CompanyName : this.loginInfo.CompanyName}
  
    let temp  =  this.rest_service.update(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.companies$ = this.fetchAll())));
     temp.subscribe()
  }


    delete(idCompanyInfo: any) {

      let temp = this.rest_service.delete(`http://192.168.0.70:3000/CompanyInfo/${idCompanyInfo}/${this.loginInfo.CompanyName}`)
     .pipe(tap(() => (this.companies$ = this.fetchAll())));
     temp.subscribe()
  }

  populateForm(data){
    console.log("user : " , data)
    //Normal fields

    /* TODO finish this. (copy pasted a bunch but not changed to work 7/22/2021)
    let temp = (<HTMLInputElement>document.getElementById("CIcompanyinformation")).value = data.FWpolicyNum
    temp = (<HTMLInputElement>document.getElementById("CIdescription")).value = data.FWservice
    temp = (<HTMLInputElement>document.getElementById("CIname")).value = data.FWdescription
    temp = (<HTMLInputElement>document.getElementById("CIDBA")).value = data.FWports
    temp = (<HTMLInputElement>document.getElementById("CIphone")).value = data.FWsource
    temp = (<HTMLInputElement>document.getElementById("CIwebsite")).value = data.FWoutbound
    temp = (<HTMLInputElement>document.getElementById("CIaddress")).value = data.FWinbound
    temp = (<HTMLInputElement>document.getElementById("CIprimaryPoC")).value = data.FWcreationDate
    
    temp = (<HTMLInputElement>document.getElementById("CISBAcertified")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIbusinessType")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CItechnicalPOCinformation")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIDUNSnum")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcagecode")).value = data.FWcreationDate

    temp = (<HTMLInputElement>document.getElementById("CIcmmcAuditAgency")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcmmcAuditorInfo")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcmmcAuditDate")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcmmcNISTauditAgency")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CINISTauditorInfo")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcagecode")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcagecode")).value = data.FWcreationDate

    */
    //Mat Selects


    /*
     this.FWsupplierRelation$ = data.FWsupplierRelation
     this.FWvendorRelation$ = data.FWvendorRelation
     this.FWcuiContract$ = data.FWcuiContract
     this.IassetIdentifier$ = data.IassetIdentifier
     this.FWprotocol$ = data.FWprotocol*/



    //TODO Mat Select Multiple: cant figure out a way to select checkboxes. Tried using formgroup/passing array to set function
    //maybe target the html element and set it that way
  
  
  
  
  }
}
