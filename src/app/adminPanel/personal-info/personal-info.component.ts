import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/injectables';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  name;
  passwordLength;
  email;
  phone;

  constructor(private loginInfo : login) { }

  ngOnInit(): void {
    this.opened = true
    this.name = this.loginInfo.name
    this.passwordLength  = '*'.repeat(Number(this.loginInfo.passwordLength))
    this.email = this.loginInfo.email
    this.phone = this.loginInfo.phone



    console.log("information : " )
    console.log(this.name, this.passwordLength, this.email, this.phone)
    console.log("login : " , this.loginInfo)
  
  }

}
