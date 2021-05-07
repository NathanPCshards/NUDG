import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { companyInfo } from '../models/companyInfo';
import { CompanyInfoService } from '../services/company-info.service';
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
    private companyInfoService: CompanyInfoService,
    private usersService : UserServiceService

  ) { }

  ngOnInit(){
    this.companies$ = this.fetchAll();
    this.Users$ = this.usersService.fetchAll();

  }

  fetchAll(): Observable<companyInfo[]> {
    return this.companyInfoService.fetchAll();
  }

  post(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber): void {
    this.companies$ = this.companyInfoService
      .post({CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber})
      .pipe(tap(() => (this.companies$ = this.fetchAll())));
  }


  update(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo): void {
    this.companies$ = this.companyInfoService
      .update({CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo})
      .pipe(tap(() => (this.companies$ = this.fetchAll())));
  }


  delete(idCompanyInfo: any): void {
    this.companies$ = this.companyInfoService
      .delete(idCompanyInfo)
      .pipe(tap(() => (this.companies$ = this.fetchAll())));
      
  }



}
