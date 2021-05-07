import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mySelect') mySelect: MatSelect;

  title = 'nudg';
  toolbar = document.getElementById("toolbar");
  height;

  rtpol= function (famType)  {
    if (famType == "all"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies'))


    }
    if (famType == "nist"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies/Nist'))


    }
    if (famType == "cmmc"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies/CMMC'))

    }
    
  }


  constructor(private http: HttpClient, private router: Router){

  }

  ngOnInit(){

  }



}


