import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { inventories } from '../models/inventory';

import { Observable } from 'rxjs';
import { CuicontractsService } from '../services/cuicontracts.service';
import { softewareApprovalService } from '../services/softwareApproval';
import { restAPI } from '../services/restAPI.service';
import { login } from '../injectables';
import { templateJitUrl } from '@angular/compiler';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  submitted = false;

  panelOpenState;
  CUIcontracts$
  Users$ 
  softwares$


  inventories$: Observable<inventories[]>;

  constructor(
    private http:HttpClient,
    private rest_service : restAPI,
    private loginInfo : login,
    private softwareApprovalService : softewareApprovalService,
    private cuiService: CuicontractsService,
   // private softwareApproval : 
   ) {

  }

  ngOnInit(){
    this.inventories$ = this.fetchAll();
    this.CUIcontracts$ = this.cuiService.fetchAll()
    this.Users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.softwares$ = this.softwareApprovalService.fetchAll()

  }
  ngOnContentInit(){

  }










  fetchAll(): Observable<inventories[]> {
    return this.rest_service.get(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`);
  }

  post(IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost, IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval): void {
   let data = { IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost,  IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, CompanyInfo : this.loginInfo.CompanyName}
    let temp = this.rest_service
      .post(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));

      temp.subscribe()
  }


  update(IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost, IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, idOrgInventory): void {
   let data = {IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost,  IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, idOrgInventory, CompanyInfo : this.loginInfo.CompanyName}
   
   
    let temp = this.rest_service
      .update(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));

      temp.subscribe()
  }


  delete(id: any): void {
    let temp = this.rest_service
      .delete(`http://localhost:3000/inventories/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
      temp.subscribe()
  }

 public onFormReset() {
   this.submitted = false;

}



}


