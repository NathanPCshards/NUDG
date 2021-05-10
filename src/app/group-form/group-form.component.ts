import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { groups } from '../models/groups';
import { networkshares } from '../models/networkshares';
import { GroupsService } from '../services/groups.service';
import { NetworksharesService } from '../services/networkshares.service';
import { UserServiceService } from '../services/user-service.service';




@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  networkShares$
  groups$: Observable<groups[]>;
  users$;
  panelOpenState = false;;

  constructor(
    private groupsService : GroupsService,
    private userService: UserServiceService,
    private groupService : GroupsService,
    private networkShareService : NetworksharesService) { 

  }

  ngOnInit(){  
    this.groups$ = this.fetchAll();
    this.users$ = this.userService.fetchAll();
    this.networkShares$ = this.networkShareService.fetchAll()

  }
  

fetchAll(): Observable<groups[]> {
  return this.groupsService.fetchAll();
}

post(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa) {
  this.groups$ = this.groupsService
    .post({ Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa})
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
}


update(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups): void {
  this.groups$ = this.groupsService
    .update({Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups})
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
}


delete(id: any): void {
  this.groups$ = this.groupsService
    .delete(id)
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
    
}

}
  
