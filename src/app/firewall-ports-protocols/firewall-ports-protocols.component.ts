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



  post(Iassetidentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract){
    FWsupplierRelation = FWsupplierRelation ? FWsupplierRelation : ""
    FWvendorRelation = FWvendorRelation ? FWvendorRelation : ""
    FWcuiContract = FWcuiContract ? FWcuiContract : ""
    Iassetidentifier = Iassetidentifier ? Iassetidentifier : ""
    FWprotocol = FWprotocol ? FWprotocol : ""
    FWcreationDate = FWcreationDate ? FWcreationDate : ""
    let data = {Iassetidentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract}

  

    let temp = this.rest_service.post(`http://192.168.0.70:3000/Firewall/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.firewalls$ = this.fetchall())));

    //again call
    temp.subscribe()




  }




  update(Iassetidentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract){
    /*let data = {Iassetidentifier, FWpolicyNum, FWservice, FWdescription, FWprotocol, FWports, FWsource, FWinbound, FWoutbound, FWcreationDate, FWsupplierRelation, FWvendorRelation, FWcuiContract, idfirewall}
    let temp = this.rest_service.post(`http://192.168.0.70:3000/Firewall/${this.loginInfo.CompanyName}`, data)
        .pipe(tap(() => (this.firewalls$ = this.fetchall())));

    //again call
    temp.subscribe()*/

  }


  delete(id : any){
    let temp = this.rest_service.delete(`http://192.168.0.70:3000/Firewall/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.firewalls$ = this.fetchall())));

    //pipe get call here
    temp.subscribe()

  }




}
