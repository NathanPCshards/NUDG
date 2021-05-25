import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { suppliers } from '../models/suppliers';
import { restAPI } from '../services/restAPI.service';
import { SuppliersService } from '../services/suppliers.service';



@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;

  name: any;
  suppliers$: Observable<suppliers[]>;



  constructor(private http: HttpClient, private formBuilder: FormBuilder,
     public dialog: MatDialog, public suppliersService : SuppliersService,
     private rest_service : restAPI,
     private loginInfo : login){
    
  }




  ngOnInit(){
    this.suppliers$ = this.fetchAll();

  }

  fetchAll(): Observable<suppliers[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/suppliers/${this.loginInfo.CompanyName}`);
  }
  
  post(Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate): void {
    SbusinessType = SbusinessType ? SbusinessType : "" 
    ScmmcAuditDate = ScmmcAuditDate ? ScmmcAuditDate : "" 
    SNISTauditDate = SNISTauditDate ? SNISTauditDate : ""
    let data = { Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate }
    
    let temp = this.rest_service
      .post(`http://192.168.0.70:3000/suppliers/${this.loginInfo.CompanyName}`,data)
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
    temp.subscribe()
  }
  
  
  update(Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate, idSuppliers): void {
    let data = { Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate, idSuppliers }
    let temp = this.rest_service
    .update(`http://192.168.0.70:3000/suppliers/${this.loginInfo.CompanyName}`,data)
    .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
    temp.subscribe()
 
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    let temp = this.rest_service
      .delete(`http://192.168.0.70:3000/suppliers/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
      temp.subscribe()  
  }

  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 

  }
  
  
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }
}

