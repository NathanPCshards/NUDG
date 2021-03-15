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

  post(companyItem: Partial<companyInfo>): void {
    const CIcompanyinformation = (<string>companyItem);
    if (!CIcompanyinformation) return;

    this.companies$ = this.companyInfoService
      .post({ CIcompanyinformation })
      .pipe(tap(() => (this.companies$ = this.fetchAll())));
  }


  update(idCompInfo, compInfo,    desc, 
         compname,   dba,         phone,
         website,    address,     ppoc, 
         busType,    tpoc,        duns, 
         cage,       cmmcAgency,  cmmcInfo,
         cmmcDate,   nistAgency,  nistDate,
         num,        sba): void {
    //const name = (<any>companyItem).trim();
    
    //if (!name) return;

    const newUsers: companyInfo = {
     
      idCompanyInfo : idCompInfo,
      CIcompanyinformation : compInfo,
      CIdescription : desc,
      CIname : compname,
      CIDBA : dba ,

      CIphone : phone,
      CIwebsite  : website, 
      CIaddress : address,
      CIprimaryPoC : ppoc,
      CISBAcertified : sba,
      CIbusinessType : busType,
      CItechnicalPOCinformation : tpoc ,
      CIDUNSnum : duns,
      CIcagecode : cage,
      CIcmmcAuditAgency : cmmcAgency,
      CIcmmcAuditorInfo: cmmcInfo,
      CIcmmcAuditDate: cmmcDate,
      CIcmmcNISTauditAgency: nistAgency,
      CINISTauditorDate: nistDate,
      CInumber: num, 

    };

    this.companies$ = this.companyInfoService
      .update(newUsers)
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
