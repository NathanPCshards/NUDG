import { Component, OnInit } from '@angular/core';
import { login } from '../../injectables'

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  name;
  constructor(private loginInfo : login) { }

  ngOnInit(): void {
    this.opened = true
    this.name = this.loginInfo.name
  }

}
