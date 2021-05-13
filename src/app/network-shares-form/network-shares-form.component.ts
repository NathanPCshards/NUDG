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

  networkshares$: Observable<networkshares[]>;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private rest_service : restAPI,
    private loginInfo : login,
 ) {
   }

  ngOnInit(){
    this.networkshares$ = this.fetchAll();
    this.Users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.Groups$ = this.rest_service.get(`http://localhost:3000/groups/${this.loginInfo.CompanyName}`);
    this.assetIdentifiers$ = this.rest_service.get(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`);


  }




fetchAll(): Observable<networkshares[]> {
  return this.rest_service.get(`http://localhost:3000/networkshares/${this.loginInfo.CompanyName}`)
}

post(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata ,GRA, GWA, URA, UWA): void {
  let data = {NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA}
   
 
  let temp = this.rest_service
    .post(`http://localhost:3000/networkshares/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));

    temp.subscribe()
}


update(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares): void {
  let data ={NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares}
   
 
  let temp = this.rest_service
    .update(`http://localhost:3000/networkshares/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));

    temp.subscribe()
}


delete(id: any): void {


  let temp = this.rest_service
    .delete(`http://localhost:3000/networkshares/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
    temp.subscribe()
    
}




}

