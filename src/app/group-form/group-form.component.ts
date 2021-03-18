import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { groups } from '../models/groups';
import { inventories } from '../models/inventory';
import { GroupsService } from '../services/groups.service';
import { SharedService } from '../services/Shared';




@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  groupSubmitted = false;
  groupForm
  results;
  value;
  groups$: Observable<groups[]>;

  panelOpenState = false;;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private groupsService : GroupsService) { 

  }

  ngOnInit(){  
    this.groups$ = this.fetchAll();
    this.groupForm = new FormGroup({
      firstName: new FormControl()
   });


  }
  


 public onFormReset(value) {
   console.log("group form reset. value  " + value);
   console.log(value == "groupForm");
  if (value == "groupForm"){
    this.groupSubmitted = false;
  }
}
fetchAll(): Observable<groups[]> {
  return this.groupsService.fetchAll();
}

post(Gnames, Gdescriptions, GcreationDate, GCUIaccess): void {

  this.groups$ = this.groupsService
    .post({ Gnames, Gdescriptions, GcreationDate, GCUIaccess })
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
}


update(Gnames, Gdescriptions, GcreationDate, GCUIaccess, idOrgGroups): void {

  this.groups$ = this.groupsService
    .update({Gnames, Gdescriptions, GcreationDate, GCUIaccess, idOrgGroups})
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.groups$ = this.groupsService
    .delete(id)
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
    
}

  
}
  
