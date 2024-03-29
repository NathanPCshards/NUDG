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
  panelOpenState = false;
  GNSwa$
  GNSra$
  GCUIaccess$
  UGRusers$

  networkDict = {}
  userDict = {}

  constructor(
    private rest_service : restAPI,
    private loginInfo : login,
    private networkShareService : NetworksharesService,
   ) { 

  }

  ngOnInit(){  
    this.groups$ = this.fetchAll();
    this.groups$.forEach(element => {
      console.log("element: ", element)
    });
    this.users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.users$.forEach(array => {
      array.forEach(element => {
          this.userDict[element.idOrgUsers] = element
      });
    });
    this.networkShares$ =  this.rest_service.get(`http://192.168.0.70:3000/networkshares/${this.loginInfo.CompanyName}`);
    this.networkShares$.forEach(array => {
      array.forEach(element => {
          this.networkDict[element.idOrgNetworkShares] = element
      });
    });
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


  async update(Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups): Promise<void> {
    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    GcreationDate = GcreationDate ? GcreationDate : ""
    GCUIaccess = GCUIaccess ? GCUIaccess : ""
    UGRusers = UGRusers ? UGRusers : ""
    GNSwa = GNSwa ? GNSwa : ""
    GNSra = GNSra ? GNSra : ""


  let data = {Gnames, Gdescriptions, GcreationDate, GCUIaccess, UGRusers, GNSra, GNSwa, idOrgGroups}

  let temp = await this.rest_service.update(`http://192.168.0.70:3000/groups/${this.loginInfo.CompanyName}`, data)
  temp.subscribe(result=>{  
  })
  let that = this
  setTimeout(function(){ that.groups$ = that.fetchAll(); console.log("fetchall called : " , that.groups$)}, 1000);




 

}

populateForm(data){
  console.log("user : " , data)
  //Normal fields
  let temp = (<HTMLInputElement>document.getElementById("Gnames")).value = data.Gnames
  temp = (<HTMLInputElement>document.getElementById("Gdescriptions")).value = data.Gdescriptions
  temp = (<HTMLInputElement>document.getElementById("GcreationDate")).value = data.GcreationDate
  //Mat Selects
  this.GNSwa$ = data.GNSwa
  this.GNSra$ = data.GNSra
  this.GCUIaccess$ = data.GCUIaccess
  //TODO Mat Select Multiple: cant figure out a way to select checkboxes. Tried using formgroup/passing array to set function
  //maybe target the html element and set it that way
  this.UGRusers$ = data.UGRusers[0]



}


delete(id: any): void {


  let temp = this.rest_service.delete(`http://192.168.0.70:3000/groups/${id}/${this.loginInfo.CompanyName}`)
  temp.subscribe(result=>{  
  })
  let that = this
  setTimeout(function(){ that.groups$ = that.fetchAll(); console.log("fetchall called : " , that.groups$)}, 1000);
}

}
  
