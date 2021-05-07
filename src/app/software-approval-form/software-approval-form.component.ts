import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GroupsService } from '../services/groups.service';
import { inventoryService } from '../services/inventory.service';
import { RolesService } from '../services/roles.service';
import { UserServiceService } from '../services/user-service.service';

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
    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private inventoryService : inventoryService,
      private userService : UserServiceService, 
      private roleService : RolesService, 
      private groupService : GroupsService) { }
  
  ngOnInit(){

    this.inventory$ = this.inventoryService.fetchAll()
    this.users$ = this.userService.fetchAll()
    this.roles$ = this.roleService.fetchAll()
    this.groups$ = this.groupService.fetchAll()


  }

  }
  