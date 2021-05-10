import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { inventories } from '../models/inventory';
import { inventoryService } from '../services/inventory.service';

import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { GroupsService } from '../services/groups.service';
import { CuicontractsService } from '../services/cuicontracts.service';
import { UserServiceService } from '../services/user-service.service';
import { SoftwareApprovalFormComponent } from '../software-approval-form/software-approval-form.component';
import { softewareApprovalService } from '../services/softwareApproval';


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
    private inventoryService:inventoryService,
    private usersService : UserServiceService,
    private softwareApprovalService : softewareApprovalService,
    private cuiService: CuicontractsService,
   // private softwareApproval : 
   ) {

  }

  ngOnInit(){
    this.inventories$ = this.fetchAll();
    this.CUIcontracts$ = this.cuiService.fetchAll()
    this.Users$ = this.usersService.fetchAll()
    this.softwares$ = this.softwareApprovalService.fetchAll()

  }
  ngOnContentInit(){

  }

  fetchAll(): Observable<inventories[]> {
    return this.inventoryService.fetchAll();
  }

  post(IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost, IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval): void {
    this.inventories$ = this.inventoryService
      .post({ IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost,  IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval })
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
  }


  update(IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost, IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, idOrgInventory): void {
    this.inventories$ = this.inventoryService
      .update( {IassetIdentifier, Iaddress, InetworkID, Ivirtual, Ipublic, Idnsname, InetbiosName, Imacaddress, IauthenticatedScan, IbaselineConfigName, IosNameAndVersion, IphysicalLocation, IhardwareSoftwareVendor, IdateOfReceipt, Icost,  IsoftwareDatabase, Ipatchlevel, Ifunction, Icomments, Iserial, Ivlan, IsystemAdmin, Iapplication, IsoftwareApproval, idOrgInventory})
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
  }


  delete(id: any): void {
    this.inventories$ = this.inventoryService
      .delete(id)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
      
  }

 public onFormReset() {
   this.submitted = false;

}



}


