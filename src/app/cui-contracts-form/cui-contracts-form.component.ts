import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { cuicontracts } from '../models/cuicontracts';
import { suppliers } from '../models/suppliers';
import { CuicontractsService } from '../services/cuicontracts.service';
import { inventoryService } from '../services/inventory.service';
import { SuppliersService } from '../services/suppliers.service';
import { UserServiceService } from '../services/user-service.service';


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
  rest_service: any;



  constructor(
    private cuicontractsService : CuicontractsService,
    private userService : UserServiceService,
    private supplierService : SuppliersService,
    private inventoryService : inventoryService,
    private loginInfo : login

    ){
    
  }
  
  ngOnInit(){
    this.cuicontracts$ = this.fetchAll();
    this.users$ = this.rest_service.get(`http://localhost:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.inventories$ = this.rest_service.get(`http://localhost:3000/inventories/${this.loginInfo.CompanyName}`);
    this.suppliers$ = this.supplierService.fetchAll();
    this.vendors$ = this.rest_service.get(`http://localhost:3000/vendors/${this.loginInfo.CompanyName}`,this.loginInfo.CompanyName);
  }

  fetchAll(): Observable<cuicontracts[]> {
    return this.cuicontractsService.fetchAll();

  }
  
  post(CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI ): void {
    //because these are coming from another tables get request. these variables show up as lists, so im converting them to strings before sending the post (otherwise request fails)
    CCsupplierRelation = String(CCsupplierRelation)
    CCvendorRelation = String(CCvendorRelation)
    CCaccountManager = String(CCaccountManager)

    this.cuicontracts$ = this.cuicontractsService
      .post({ CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI  })
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
  
  
  }
  update(CCname, CCnum, CCstartDate, CCendDate, CCdescription, idCUIcontracts ): void {
    this.cuicontracts$ = this.cuicontractsService
      .update({CCname, CCnum, CCstartDate, CCendDate, CCdescription, idCUIcontracts} )
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.cuicontracts$ = this.cuicontractsService
      .delete(id)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
      
  }

}
