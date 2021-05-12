import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { vendors } from '../models/vendors';
import { restAPI } from '../services/restAPI.service';




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
    public dialog: MatDialog, 
    private rest_service : restAPI,
    private loginInfo : login){
    
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
    return this.rest_service.get(`http://localhost:3000/vendors/${this.loginInfo.CompanyName}`);
  }
  
  async post(Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate): Promise<void> {

    let data = {Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate, CompanyName : this.loginInfo.CompanyName}

    let temp = await this.rest_service.post(`http://localhost:3000/vendors/${this.loginInfo.CompanyName}`,data)
    .pipe(tap(() => (this.vendors$ = this.fetchAll())));
    temp.subscribe()

      
  }
  
  
  async update(Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate, idVendors): Promise<void> {  
    let data = {Vname, Vproduct, Vaddress, Vwebsite, VtechnicalPOCinfo, VDUNSnum, Vcagecode, VbusinessType, VSBAcertified, VcontractualPOCinfo, VcmmcAuditAgency, VcmmcAuditorInfo, VcmmcAuditDate, VNISTauditAgency, VNISTauditorInfo, VNISTauditDate, idVendors, CompanyName : this.loginInfo.CompanyName}

    let temp = await this.rest_service.update(`http://localhost:3000/vendors/${this.loginInfo.CompanyName}`,data)
    .pipe(tap(() => (this.vendors$ = this.fetchAll())));
    temp.subscribe()

  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
    let temp = this.rest_service.delete(`http://localhost:3000/CompanyInfo/${id}/${this.loginInfo.CompanyName}`)
     .pipe(tap(() => (this.vendors$ = this.fetchAll())));
     temp.subscribe()
      
  }
  
  

}




