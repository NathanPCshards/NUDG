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
    this.users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.networkShares$ =  this.rest_service.get(`http://192.168.0.70:3000/networkshares/${this.loginInfo.CompanyName}`);

  }
  

fetchAll() {
  return this.rest_service.get(`http://192.168.0.70:3000/groups/${this.loginInfo.CompanyName}`)
}

post(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa) {


    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    GcreationDate = GcreationDate ? GcreationDate : ""
    GCUIaccess = GCUIaccess ? GCUIaccess : ""
    UGRusers = UGRusers ? UGRusers : ""
    GNSwa = GNSwa ? GNSwa : ""
    GNSra = GNSra ? GNSra : ""
    
  let data = { Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa}

  let temp = this.rest_service.post(`http://192.168.0.70:3000/groups/${this.loginInfo.CompanyName}`,data)
  .pipe(tap(() => (this.groups$ = this.fetchAll())));

  temp.subscribe()

}


update(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups): void {
    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    GcreationDate = GcreationDate ? GcreationDate : ""
    GCUIaccess = GCUIaccess ? GCUIaccess : ""
    UGRusers = UGRusers ? UGRusers : ""
    GNSwa = GNSwa ? GNSwa : ""
    GNSra = GNSra ? GNSra : ""

  let data = {Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups}

  let temp = this.rest_service.update(`http://192.168.0.70:3000/groups/${this.loginInfo.CompanyName}`, data)
  .pipe(tap(() => (this.groups$ = this.fetchAll())));

  temp.subscribe()

}


delete(id: any): void {


  let temp = this.rest_service.delete(`http://192.168.0.70:3000/groups/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.groups$ = this.fetchAll())));

  temp.subscribe()
}

}
  
