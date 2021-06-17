import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';


@Component({
  selector: 'app-firewall-ports-protocols',
  templateUrl: './firewall-ports-protocols.component.html',
  styleUrls: ['./firewall-ports-protocols.component.scss']
})
export class FirewallPortsProtocolsComponent implements OnInit {
  panelOpenState = false
  firewalls$ 
  suppliers$;
  vendors$
  contracts$
  inventories$;

  FWsupplierRelation$
  FWvendorRelation$
  FWcuiContract$
  IassetIdentifier$
  FWprotocol$


  constructor(
    private rest_service : restAPI,
    private loginInfo : login

  ) { }

  ngOnInit(): void {
    this.firewalls$ = this.fetchall()

    this.inventories$ = this.rest_service.get(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`)
    this.suppliers$ = this.rest_service.get(`http://192.168.0.70:3000/suppliers/${this.loginInfo.CompanyName}`)
    this.vendors$ = this.rest_service.get(`http://192.168.0.70:3000/vendors/${this.loginInfo.CompanyName}`)
    this.contracts$ = this.rest_service.get(`http://192.168.0.70:3000/cuicontracts/${this.loginInfo.CompanyName}`)
  }


  fetchall(){
    return this.rest_service.get(`http://192.168.0.70:3000/Firewall/${this.loginInfo.CompanyName}`)


  }



  post(IassetIdentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract){
    FWsupplierRelation = FWsupplierRelation ? FWsupplierRelation : ""
    FWvendorRelation = FWvendorRelation ? FWvendorRelation : ""
    FWcuiContract = FWcuiContract ? FWcuiContract : ""
    IassetIdentifier = IassetIdentifier ? IassetIdentifier : ""
    FWprotocol = FWprotocol ? FWprotocol : ""
    FWcreationDate = FWcreationDate ? FWcreationDate : ""
    let data = {IassetIdentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract}

  

    let temp = this.rest_service.post(`http://192.168.0.70:3000/Firewall/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.firewalls$ = this.fetchall())));

    //again call
    temp.subscribe()




  }

  populateForm(data){
    console.log("user : " , data)
    //Normal fields
    let temp = (<HTMLInputElement>document.getElementById("FWpolicyNum")).value = data.FWpolicyNum
    temp = (<HTMLInputElement>document.getElementById("FWservice")).value = data.FWservice
    temp = (<HTMLInputElement>document.getElementById("FWdescription")).value = data.FWdescription
    temp = (<HTMLInputElement>document.getElementById("FWports")).value = data.FWports
    temp = (<HTMLInputElement>document.getElementById("FWsource")).value = data.FWsource
    temp = (<HTMLInputElement>document.getElementById("FWoutbound")).value = data.FWoutbound
    temp = (<HTMLInputElement>document.getElementById("FWinbound")).value = data.FWinbound
    temp = (<HTMLInputElement>document.getElementById("FWcreationDate")).value = data.FWcreationDate

    //Mat Selects
     this.FWsupplierRelation$ = data.FWsupplierRelation
     this.FWvendorRelation$ = data.FWvendorRelation
     this.FWcuiContract$ = data.FWcuiContract
     this.IassetIdentifier$ = data.IassetIdentifier
     this.FWprotocol$ = data.FWprotocol
    //TODO Mat Select Multiple: cant figure out a way to select checkboxes. Tried using formgroup/passing array to set function
    //maybe target the html element and set it that way
  
  
  
  
  }



  update(IassetIdentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract, idfirewall){
  
    console.log("company name : " , this.loginInfo.CompanyName)
  
    let data = {IassetIdentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract, idfirewall}
    let temp = this.rest_service.update(`http://192.168.0.70:3000/Firewall/${this.loginInfo.CompanyName}`, data)
        .pipe(tap(() => (this.firewalls$ = this.fetchall())));

 
    temp.subscribe()

  }


  delete(id : any){
    let temp = this.rest_service.delete(`http://192.168.0.70:3000/Firewall/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.firewalls$ = this.fetchall())));

    //pipe get call here
    temp.subscribe()

  }




}
