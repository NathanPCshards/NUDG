import { Component, Input, OnInit } from '@angular/core';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';

@Component({
  selector: 'app-standards-form',
  templateUrl: './standards-form.component.html',
  styleUrls: ['./standards-form.component.scss']
})
export class StandardsFormComponent implements OnInit {

  @Input()
  id$;



  constructor(
    private rest_service : restAPI, private loginInfo : login
  ) { }

  ngOnInit(): void {
  }


  submit(Standard){
    /*
    let temp = this.rest_service.post(`http://192.168.0.70:3000/standards/${this.id$}/${this.loginInfo.CompanyName}`,Standard)
    temp.subscribe();
    */
    this.rest_service.standardsEmit(Standard)
  }

}
