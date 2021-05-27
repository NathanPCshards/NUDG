import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { networkshares } from '../models/networkshares';
import { restAPI } from '../services/restAPI.service';


@Component({
  selector: 'app-network-shares-page',
  templateUrl: './network-shares-page.html',
  styleUrls: ['./network-shares-form.component.scss']
})
export class networkSharesPage implements OnInit {

  panelOpenState;
  rowSelected = false;
  assetIdentifiers$;
  Users$;
  Groups$;

  GRA$
  GWA$
  URA$
  UWA$
  NSresourceType$
  WassetID$
  CUIdata$
  NShostIdentifier$


  networkshares$: Observable<networkshares[]>;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private rest_service : restAPI,
    private loginInfo : login,
 ) {
   }

  ngOnInit(){
    this.networkshares$ = this.fetchAll();
    this.Users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.Groups$ = this.rest_service.get(`http://192.168.0.70:3000/groups/${this.loginInfo.CompanyName}`);
    this.assetIdentifiers$ = this.rest_service.get(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`);


  }




fetchAll(): Observable<networkshares[]> {
  return this.rest_service.get(`http://192.168.0.70:3000/networkshares/${this.loginInfo.CompanyName}`)
}

post(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata ,GRA, GWA, URA, UWA): void {
    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    NSresourceType = NSresourceType ? NSresourceType : ""
    GRA = GRA ? GRA : ""
    GWA = GWA ? GWA : ""
    URA = URA ? URA : ""
    UWA = UWA ? UWA : ""
    CUIdata = CUIdata ? CUIdata : ""
    NShostIdentifier = NShostIdentifier ? NShostIdentifier : ""

    let data = {NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA}

  let temp = this.rest_service
    .post(`http://192.168.0.70:3000/networkshares/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));

    temp.subscribe()
}


update(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares): void {
  NSresourceType = NSresourceType ? NSresourceType : ""
  GRA = GRA ? GRA : ""
  GWA = GWA ? GWA : ""
  URA = URA ? URA : ""
  UWA = UWA ? UWA : ""
  CUIdata = CUIdata ? CUIdata : ""
  NShostIdentifier = NShostIdentifier ? NShostIdentifier : ""

  let data ={NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares}
   
 
  let temp = this.rest_service
    .update(`http://192.168.0.70:3000/networkshares/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));

    temp.subscribe()
}


populateForm(data){
  console.log("user : " , data)
  //Normal fields
  let temp = (<HTMLInputElement>document.getElementById("NSshareName")).value = data.NSshareName

  temp = (<HTMLInputElement>document.getElementById("NSfolderPath")).value = data.NSfolderPath
  temp = (<HTMLInputElement>document.getElementById("NSdescription")).value = data.NSdescription

  //Mat Selects
  this.GRA$ = data.GRA
  this.GWA$ = data.GWA
  this.URA$ = data.URA
  this.UWA$ = data.UWA
  this.NShostIdentifier$ = data.NShostIdentifier

  this.NSresourceType$ = data.NSresourceType
  this.CUIdata$ = data.CUIdata





}



delete(id: any): void {


  let temp = this.rest_service
    .delete(`http://192.168.0.70:3000/networkshares/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
    temp.subscribe()
    
}




}

