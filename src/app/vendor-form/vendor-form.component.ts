import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { vendors } from '../models/vendors';
import { VendorsService } from '../services/vendors.service';




@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  picker;
  vendorform;
  submitted= false;
  results;// = res.json();
  panelOpenState = false;

  name: any;
  vendors$: Observable<vendors[]>;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    public dialog: MatDialog, private vendorsService : VendorsService){
    
  }

  ngAfterViewInit(){

  }

  ngOnInit(){
    this.vendors$ = this.fetchAll();
    this.vendorform = new FormGroup({
        firstname : new FormControl()
    });
  }
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }
  fetchAll(): Observable<vendors[]> {
    return this.vendorsService.fetchAll();
  }
  
  post(Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate): void {
  
    this.vendors$ = this.vendorsService
      .post({ Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate })
      .pipe(tap(() => (this.vendors$ = this.fetchAll())));
      
  }
  
  
  update(Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate, idVendors): void {

  

  
    this.vendors$ = this.vendorsService
      .update({Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate, idVendors})
      .pipe(tap(() => (this.vendors$ = this.fetchAll())));
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.vendors$ = this.vendorsService
      .delete(id)
      .pipe(tap(() => (this.vendors$ = this.fetchAll())));
      
  }
  
  

}




