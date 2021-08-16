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
    this.users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.inventories$ = this.rest_service.get(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`);
    this.suppliers$ = this.rest_service.get(`http://192.168.0.70:3000/suppliers/${this.loginInfo.CompanyName}`);
    this.vendors$ = this.rest_service.get(`http://192.168.0.70:3000/vendors/${this.loginInfo.CompanyName}`);
  }

  fetchAll(): Observable<cuicontracts[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/cuicontracts/${this.loginInfo.CompanyName}`);

  }

  populateForm(data){
    console.log("user : " , data)
    //Normal fields


    let temp = (<HTMLInputElement>document.getElementById("CCname")).value = data.CCname
    temp = (<HTMLInputElement>document.getElementById("CCnum")).value = data.CCnum

    /*
    temp = (<HTMLInputElement>document.getElementById("Ivirtual")).value = data.Ivirtual
    temp = (<HTMLInputElement>document.getElementById("Ipublic")).value = data.Ipublic
    temp = (<HTMLInputElement>document.getElementById("Idnsname")).value = data.Idnsname
    temp = (<HTMLInputElement>document.getElementById("InetbiosName")).value = data.InetbiosName
    temp = (<HTMLInputElement>document.getElementById("Imacaddress")).value = data.Imacaddress
    temp = (<HTMLInputElement>document.getElementById("IauthenticatedScan")).value = data.IauthenticatedScan
    

    temp = (<HTMLInputElement>document.getElementById("Iaddress")).value = data.Iaddress
    temp = (<HTMLInputElement>document.getElementById("IbaselineConfigName")).value = data.IbaselineConfigName
    temp = (<HTMLInputElement>document.getElementById("IhardwareSoftwareVendor")).value = data.IhardwareSoftwareVendor
    temp = (<HTMLInputElement>document.getElementById("IsoftwareDatabase")).value = data.IsoftwareDatabase
    temp = (<HTMLInputElement>document.getElementById("Ipatchlevel")).value = data.Ipatchlevel


    temp = (<HTMLInputElement>document.getElementById("Ifunction")).value = data.Ifunction
    temp = (<HTMLInputElement>document.getElementById("Iserial")).value = data.Iserial
    temp = (<HTMLInputElement>document.getElementById("Ivlan")).value = data.Ivlan
    temp = (<HTMLInputElement>document.getElementById("IsystemAdmin")).value = data.IsystemAdmin
    temp = (<HTMLInputElement>document.getElementById("Iapplication")).value = data.Iapplication

    temp = (<HTMLInputElement>document.getElementById("IosNameAndVersion")).value = data.IosNameAndVersion
    temp = (<HTMLInputElement>document.getElementById("IphysicalLocation")).value = data.IphysicalLocation
    temp = (<HTMLInputElement>document.getElementById("IdateOfReceipt")).value = data.IdateOfReceipt
    temp = (<HTMLInputElement>document.getElementById("Icost")).value = data.Icost
    temp = (<HTMLInputElement>document.getElementById("IsoftwareApproval")).value = data.IsoftwareApproval
    temp = (<HTMLInputElement>document.getElementById("Icomments")).value = data.Icomments

    temp = (<HTMLInputElement>document.getElementById("IassetType")).value = data.IassetType
    temp = (<HTMLInputElement>document.getElementById("IhardwareMakeModel")).value = data.IhardwareMakeModel
    temp = (<HTMLInputElement>document.getElementById("IsupplierInfo")).value = data.IsupplierInfo

    //TODO Mat Select Multiple: cant figure out a way to select checkboxes. Tried using formgroup/passing array to set function
    //maybe target the html element and set it that way
        //user field
        //softwared installed on device field
        //maybe radio button groups

        //TODO solved -> use arrays check the Lanyard/Check in app event page for similar behavior
        */
  
  
  
  }

  
  post(CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI ): void {
    //because these are coming from another tables get request. these variables show up as lists, so im converting them to strings before sending the post (otherwise request fails)
    CCsupplierRelation = CCsupplierRelation ? String(CCsupplierRelation) : ""
    CCvendorRelation = CCvendorRelation ? String(CCvendorRelation) : ""
    CCaccountManager = CCaccountManager ? String(CCaccountManager) : ""

    let data =  { CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI  }
    let temp = this.rest_service
    .post(`http://192.168.0.70:3000/cuicontracts/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));

    temp.subscribe()
  
  }
  update(CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI,idCUIcontracts ): void {
    CCsupplierRelation = CCsupplierRelation ? String(CCsupplierRelation) : ""
    CCvendorRelation = CCvendorRelation ? String(CCvendorRelation) : ""
    CCaccountManager = CCaccountManager ? String(CCaccountManager) : ""
    let data = { CCname, CCnum, CCstartDate, CCendDate, CCdescription, CCaccountManager , CCsupplierRelation , CCvendorRelation , CCfileInput , CCurl , CCgovCUI , CCnewCUI , CCmodCUI, idCUIcontracts }
   
   
    let temp = this.rest_service.update(`http://192.168.0.70:3000/cuicontracts/${this.loginInfo.CompanyName}`, data)
      temp.subscribe(result=>{  
        //TODO For update calls, I could not get .pipe(get call for data) to work because the api doesnt return anything at all, so doing a call after .1 seconds. (not sure how to return status from multiple/nested query)
      })
      let that = this
      setTimeout(function(){ that.cuicontracts$ = that.fetchAll();}, 100);
  }
  
  
  delete(id: any): void {
 
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.cuicontracts$ = this.rest_service
      .delete(`http://192.168.0.70:3000/cuicontracts/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
      
  }

}
