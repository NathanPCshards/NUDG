import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { number } from 'echarts';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { companyInfo } from '../models/companyInfo';
import { CompanyInfoService } from '../services/company-info.service';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.scss']
})
export class CompanyInfoFormComponent {
  submitted = false;
  companyInfoForm;
  results; 
  panelOpenState;
  companies$: Observable<companyInfo[]>;

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              private companyInfoService: CompanyInfoService
   

  ) { }

  ngOnInit(){
    this.companies$ = this.fetchAll();

    this.companyInfoForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
    });
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
    console.log("update : "  , CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo )

    this.companies$ = this.companyInfoService
      .update({CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, idCompanyInfo})
      .pipe(tap(() => (this.companies$ = this.fetchAll())));
  }


  delete(idCompanyInfo: any): void {
    console.log("attempting to delete id : " , idCompanyInfo)


    this.companies$ = this.companyInfoService
      .delete(idCompanyInfo)
      .pipe(tap(() => (this.companies$ = this.fetchAll())));
      
  }

  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
      //post here
 }

 public onFormReset() {
   console.log("Form was reset")
 }

}
