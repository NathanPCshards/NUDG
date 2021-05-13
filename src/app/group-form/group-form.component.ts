import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { NetworksharesService } from '../services/networkshares.service';
import { restAPI } from '../services/restAPI.service';





@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  networkShares$
  groups$;
  users$;
  panelOpenState = false;;

  constructor(
    private rest_service : restAPI,
    private loginInfo : login,
    private networkShareService : NetworksharesService) { 

  }

  ngOnInit(){  
    this.groups$ = this.fetchAll();
    this.users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.networkShares$ = this.networkShareService.fetchAll()

  }
  

fetchAll() {
  return this.rest_service.get(`http://localhost:3000/groups/${this.loginInfo.CompanyName}`)
}

post(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa) {
  let data = { Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa}

  let temp = this.rest_service.post(`http://localhost:3000/groups/${this.loginInfo.CompanyName}`,data)
  .pipe(tap(() => (this.groups$ = this.fetchAll())));

  temp.subscribe()

}


update(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups): void {


  let data = {Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups}

  let temp = this.rest_service.update(`http://localhost:3000/groups/${this.loginInfo.CompanyName}`, data)
  .pipe(tap(() => (this.groups$ = this.fetchAll())));

  temp.subscribe()

}


delete(id: any): void {


  let temp = this.rest_service.delete(`http://localhost:3000/groups/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.groups$ = this.fetchAll())));

  temp.subscribe()
}

}
  
