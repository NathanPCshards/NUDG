import { Component, OnInit } from '@angular/core';
import { login } from 'src/app/injectables';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  name;
  constructor(private loginInfo : login) { }

  ngOnInit(): void {
    this.opened = true
    this.name = this.loginInfo.name
  }

}
