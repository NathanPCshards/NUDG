import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { inventories } from '../models/inventory';

import { Observable } from 'rxjs';
import { restAPI } from '../services/restAPI.service';
import { login } from '../injectables';


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
   // private softwareApproval : 
   ) {

  }

  ngOnInit(){
    this.inventories$ = this.fetchAll();
    this.CUIcontracts$ = this.rest_service.get(`http://192.168.0.70:3000/cuicontracts/${this.loginInfo.CompanyName}`);
    this.Users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.softwares$ = this.rest_service.get(`http://192.168.0.70:3000/softwareApproval/${this.loginInfo.CompanyName}`)

  }
  ngOnContentInit(){

  }










  fetchAll(): Observable<inventories[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`);
  }

  post(IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost, IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, IassetType, IhardwareMakeModel, IsupplierInfo): void {
   let data = { IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost,  IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, CompanyInfo : this.loginInfo.CompanyName, IassetType, IhardwareMakeModel, IsupplierInfo}
    let temp = this.rest_service
      .post(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));

      temp.subscribe()
  }


  populateForm(data){
    console.log("user : " , data)
    //Normal fields


    let temp = (<HTMLInputElement>document.getElementById("IassetIdentifier")).value = data.IassetIdentifier
    temp = (<HTMLInputElement>document.getElementById("InetworkID")).value = data.InetworkID
    temp = (<HTMLInputElement>document.getElementById("Ivirtual")).value = data.Ivirtual
    temp = (<HTMLInputElement>document.getElementById("Ipublic")).value = data.Ipublic
    temp = (<HTMLInputElement>document.getElementById("Idnsname")).value = data.Idnsname
    temp = (<HTMLInputElement>document.getElementById("InetbiosName")).value = data.InetbiosName
    temp = (<HTMLInputElement>document.getElementById("Imacaddress")).value = data.Imacaddress
    temp = (<HTMLInputElement>document.getElementById("IauthenticatedScan")).value = data.IauthenticatedScan
    

    temp = (<HTMLInputElement>document.getElementById("Iaddress")).value = data.Iaddress
    temp = (<HTMLInputElement>document.getElementById("IbaselineConfigName")).value = data.IbaselineConfigName
    temp = (<HTMLInputElement>document.getElementById("IhardwareSoftwareVendor")).value = data.IhardwareSoftwareVendor
    temp = (<HTMLInputElement>document.getElementById("IsoftwareDatabase")).value = data.IsoftwareDatabase
    temp = (<HTMLInputElement>document.getElementById("Ipatchlevel")).value = data.Ipatchlevel


    temp = (<HTMLInputElement>document.getElementById("Ifunction")).value = data.Ifunction
    temp = (<HTMLInputElement>document.getElementById("Iserial")).value = data.Iserial
    temp = (<HTMLInputElement>document.getElementById("Ivlan")).value = data.Ivlan
    temp = (<HTMLInputElement>document.getElementById("IsystemAdmin")).value = data.IsystemAdmin
    temp = (<HTMLInputElement>document.getElementById("Iapplication")).value = data.Iapplication

    temp = (<HTMLInputElement>document.getElementById("IosNameAndVersion")).value = data.IosNameAndVersion
    temp = (<HTMLInputElement>document.getElementById("IphysicalLocation")).value = data.IphysicalLocation
    temp = (<HTMLInputElement>document.getElementById("IdateOfReceipt")).value = data.IdateOfReceipt
    temp = (<HTMLInputElement>document.getElementById("Icost")).value = data.Icost
    temp = (<HTMLInputElement>document.getElementById("IsoftwareApproval")).value = data.IsoftwareApproval
    temp = (<HTMLInputElement>document.getElementById("Icomments")).value = data.Icomments

    temp = (<HTMLInputElement>document.getElementById("IassetType")).value = data.IassetType
    temp = (<HTMLInputElement>document.getElementById("IhardwareMakeModel")).value = data.IhardwareMakeModel
    temp = (<HTMLInputElement>document.getElementById("IsupplierInfo")).value = data.IsupplierInfo

    //TODO Mat Select Multiple: cant figure out a way to select checkboxes. Tried using formgroup/passing array to set function
    //maybe target the html element and set it that way
        //user field
        //softwared installed on device field
        //maybe radio button groups
  
  
  
  }


  update(IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost, IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, IassetType, IhardwareMakeModel, IsupplierInfo, idOrgInventory): void {
   let data = {IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost,  IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, IassetType, IhardwareMakeModel, IsupplierInfo, idOrgInventory, CompanyInfo : this.loginInfo.CompanyName}
   
   
    let temp = this.rest_service
      .update(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));

      temp.subscribe()
  }


  delete(id: any): void {
    let temp = this.rest_service
      .delete(`http://192.168.0.70:3000/inventories/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
      temp.subscribe()
  }

 public onFormReset() {
   this.submitted = false;

}



}


