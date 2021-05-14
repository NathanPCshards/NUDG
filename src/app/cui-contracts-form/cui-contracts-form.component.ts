import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { cuicontracts } from '../models/cuicontracts';
import { restAPI } from '../services/restAPI.service';
import { SuppliersService } from '../services/suppliers.service';


@Component({
  selector: 'app-cui-contracts-form',
  templateUrl: './cui-contracts-form.component.html',
  styleUrls: ['./cui-contracts-form.component.scss']
})
export class CuiContractsFormComponent implements OnInit {

  cuicontracts$: Observable<cuicontracts[]>;
  users$;
  inventories$;
  suppliers$;
  vendors$;

  panelOpenState = false;




  constructor(
    private rest_service : restAPI,

    private loginInfo : login

    ){
    
  }
  
  ngOnInit(){
    this.cuicontracts$ = this.fetchAll();
    this.users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.inventories$ = this.rest_service.get(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`);
    this.suppliers$ = this.rest_service.get(`http://localhost:3000/suppliers/${this.loginInfo.CompanyName}`);
    this.vendors$ = this.rest_service.get(`http://localhost:3000/vendors/${this.loginInfo.CompanyName}`);
  }

  fetchAll(): Observable<cuicontracts[]> {
    return this.rest_service.get(`http://localhost:3000/cuicontracts/${this.loginInfo.CompanyName}`);

  }
  
  post(CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI ): void {
    //because these are coming from another tables get request. these variables show up as lists, so im converting them to strings before sending the post (otherwise request fails)
    CCsupplierRelation = String(CCsupplierRelation)
    CCvendorRelation = String(CCvendorRelation)
    CCaccountManager = String(CCaccountManager)

    let data =  { CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI  }
    let temp = this.rest_service
    .post(`http://localhost:3000/cuicontracts/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));

    temp.subscribe()
  
  }
  update(CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI,idCUIcontracts ): void {
    CCsupplierRelation = String(CCsupplierRelation)
    CCvendorRelation = String(CCvendorRelation)
    CCaccountManager = String(CCaccountManager)
    let data = { CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI, idCUIcontracts }
   
   
    this.cuicontracts$ = this.rest_service
      .update(`http://localhost:3000/cuicontracts/${this.loginInfo.CompanyName}`, data)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.cuicontracts$ = this.rest_service
      .delete(`http://localhost:3000/cuicontracts/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
      
  }

}
