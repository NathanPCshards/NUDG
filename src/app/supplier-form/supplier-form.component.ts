import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { suppliers } from '../models/suppliers';
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
     public dialog: MatDialog, public suppliersService : SuppliersService){
    
  }




  ngOnInit(){
    this.suppliers$ = this.fetchAll();

  }

  fetchAll(): Observable<suppliers[]> {
    return this.suppliersService.fetchAll();
  }
  
  post(Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate): void {
 
 
    this.suppliers$ = this.suppliersService
      .post({ Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate })
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
  }
  
  
  update(Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate, idSuppliers): void {
    
    this.suppliers$ = this.suppliersService
    .update({ Sname, Sproduct, Saddress, Swebsite, StechnicalPOCinfo, SDUNSnum, Scagecode, SbusinessType, SSBAcertified, ScontractualPOCinfo, ScmmcAuditAgency, ScmmcAuditorInfo, ScmmcAuditDate, SNISTauditAgency, SNISTauditorInfo, SNISTauditDate, idSuppliers })
    .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
 
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.suppliers$ = this.suppliersService
      .delete(id)
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
      
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    /*
    this.http.post(configUrl,this.UserForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);*/
  }
  
  
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }
}

