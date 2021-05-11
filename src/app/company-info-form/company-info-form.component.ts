import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { companyInfo } from '../models/companyInfo';
import { CompanyInfoService } from '../services/company-info.service';
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
  temp$;

  constructor(  
    private companyInfoService: CompanyInfoService,
    private usersService : UserServiceService,
    private rest_service : restAPI,
    private loginInfo : login

  ) { }

  ngOnInit(){
    this.companies$ = this.fetchAll();
    this.Users$ = this.usersService.fetchAll();

    this.companies$.subscribe()
    
    console.log("login info : " , this.loginInfo.CompanyName)

  }

  fetchAll(): Observable<companyInfo[]> {

    let CompanyName = this.loginInfo.CompanyName

    return this.rest_service.get(`http://localhost:3000/CompanyInfo/${CompanyName}`,CompanyName);
  }

  async post(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber): Promise<void> {
    let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, CompanyName : this.loginInfo.CompanyName}

   this.temp$ = await this.rest_service.post(`http://localhost:3000/CompanyInfo/${this.loginInfo.CompanyName}`,data)
   this.temp$.subscribe()
   this.fetchAll()


  }


  async update(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo): Promise<void> {
    let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo, CompanyName : this.loginInfo.CompanyName}
  
    this.temp$ = await this.rest_service.update(`http://localhost:3000/CompanyInfo/${this.loginInfo.CompanyName}`, data)
    this.temp$.subscribe().then(e=>{
      console.log("test")
      this.fetchAll()

    })

  /*
    this.companies$ = this.companyInfoService
     // .update()
      .pipe(tap(() => (this.companies$ = this.fetchAll())));*/
  }


  async delete(idCompanyInfo: any): Promise<void> {

    this.temp$ = await this.rest_service.delete(`http://localhost:3000/CompanyInfo/${idCompanyInfo}/${this.loginInfo.CompanyName}`,this.loginInfo.CompanyName)
    .pipe(
      tap((_) => this.fetchAll()),
    )


    /*
    this.companies$ = this.companyInfoService
      .delete(idCompanyInfo)
      .pipe(tap(() => (this.companies$ = this.fetchAll())));*/
      
  }



}
