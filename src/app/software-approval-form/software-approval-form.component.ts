import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { GroupsService } from '../services/groups.service';
import { inventoryService } from '../services/inventory.service';
import { RolesService } from '../services/roles.service';
import { softewareApprovalService } from '../services/softwareApproval';
import { UserServiceService } from '../services/user-service.service';
import { VendorsService } from '../services/vendors.service';

@Component({
  selector: 'app-software-approval-form',
  templateUrl: './software-approval-form.component.html',
  styleUrls: ['./software-approval-form.component.scss']
})
export class SoftwareApprovalFormComponent implements OnInit {
inventory$;
users$;
roles$;
groups$;
software$
vendors$
panelOpenState = false;

    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private inventoryService : inventoryService,
      private userService : UserServiceService, 
      private roleService : RolesService, 
      private groupService : GroupsService,
      private vendorService : VendorsService,
      private softwareApprovalService : softewareApprovalService) { }
  
  ngOnInit(){
    //Loading Data
    this.software$ = this.softwareApprovalService.fetchAll()
    this.vendors$ = this.vendorService.fetchAll()
    this.inventory$ = this.inventoryService.fetchAll()
    this.users$ = this.userService.fetchAll()
    this.roles$ = this.roleService.fetchAll()
    this.groups$ = this.groupService.fetchAll()


  }
  async submit(SWname , SWSupplierInformation , SWdescription , SWinstallDate , 
    SWinstallPath , SWtype , SWdateApproved , SWplatform, SWversion , SWpatchNum , SWupdateSchedule , SWmanualReviewDate , 
    SWautomaticUpdateDate , SWinternetReq , SWlegacy , SWelevatedPrivileges , SWvulnerabilities , SWusers , SWgroups , SWroles ,
     SWassetIdentifier , SWvendor ){

    await this.softwareApprovalService.post({SWname , SWSupplierInformation , SWdescription , SWinstallDate , 
        SWinstallPath , SWtype , SWdateApproved , SWplatform, SWversion , SWpatchNum , SWupdateSchedule , SWmanualReviewDate , 
        SWautomaticUpdateDate , SWinternetReq , SWlegacy , SWelevatedPrivileges , SWvulnerabilities , SWusers , SWgroups , SWroles ,
         SWassetIdentifier , SWvendor }).toPromise().then(this.software$ = this.softwareApprovalService.fetchAll())

         



  }

  async delete(id : any){
    //Delete Entry
    this.software$ = await this.softwareApprovalService.delete(id).toPromise()
    //Reload Data
    this.software$ = this.softwareApprovalService.fetchAll()

  }

  }
  