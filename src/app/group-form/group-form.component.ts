import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { groups } from '../models/groups';
import { GroupsService } from '../services/groups.service';




@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  groups$: Observable<groups[]>;

  panelOpenState = false;;

  constructor(private groupsService : GroupsService) { 

  }

  ngOnInit(){  
    this.groups$ = this.fetchAll();

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
  this.groups$ = this.groupsService
    .delete(id)
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
    
}

}
  
