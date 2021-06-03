import { Component, OnInit } from '@angular/core';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';

@Component({
  selector: 'app-poam',
  templateUrl: './poam.component.html',
  styleUrls: ['./poam.component.scss']
})
export class POAMComponent implements OnInit {
  panelOpenState = false
  weaknesses$
  constructor(public rest_service : restAPI, public loginInfo : login) { }

  ngOnInit(): void {
    this.weaknesses$ = this.fetchAllWeaknesses()
    this.weaknesses$.forEach(element => {
      console.log("data  : " , element)
    });
  }

  fetchAllWeaknesses(){
    return this.rest_service.get(`http://192.168.0.70:3000/weaknesses/All/${this.loginInfo.CompanyName}`)
  }

  filterWeaknesses(){

  }

}
