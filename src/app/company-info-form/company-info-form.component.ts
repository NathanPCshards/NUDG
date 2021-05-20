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
    this.Users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.Users$.subscribe()
    this.companies$.subscribe()


  }

  fetchAll(): Observable<companyInfo[]> {

    return this.rest_service.get(`http://localhost:3000/CompanyInfo/${this.loginInfo.CompanyName}`);
  }

   post(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber){
     //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
     CIprimaryPoC = CIprimaryPoC ? CIprimaryPoC : ""
     CISBAcertified = CISBAcertified ? CISBAcertified : ""
     CIbusinessType = CIbusinessType ? CIbusinessType : ""
     CIcmmcAuditDate = CIcmmcAuditDate ? CIcmmcAuditDate : ""
     CINISTauditorDate = CINISTauditorDate ? CINISTauditorDate : ""




   let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, CompanyName : this.loginInfo.CompanyName}

   let temp =  this.rest_service.post(`http://localhost:3000/CompanyInfo/${this.loginInfo.CompanyName}`,data)
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
  
    let temp  =  this.rest_service.update(`http://localhost:3000/CompanyInfo/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.companies$ = this.fetchAll())));
     temp.subscribe()
  }


    delete(idCompanyInfo: any) {

      let temp = this.rest_service.delete(`http://localhost:3000/CompanyInfo/${idCompanyInfo}/${this.loginInfo.CompanyName}`)
     .pipe(tap(() => (this.companies$ = this.fetchAll())));
     temp.subscribe()
  }



}
