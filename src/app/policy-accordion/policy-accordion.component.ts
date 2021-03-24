import { Component, Input, OnInit } from '@angular/core';
import { PolicyAccordionService } from '../services/policy-accordion.service';


const obj = {
  title: '',
  description: ''
}
const accordionEntries: any[] = [];
for (let i = 0; i < 1; i++) {
  accordionEntries.push(obj);
}



@Component({
  selector: 'app-policy-accordion',
  templateUrl: './policy-accordion.component.html',
  styleUrls: ['./policy-accordion.component.scss']
})
export class PolicyAccordionComponent implements OnInit {
  entries: any[];  
  constructor(private service: PolicyAccordionService ) { }

  ngOnInit() {
    this.entries = accordionEntries
    this.service.onAccordionClick.subscribe(data =>{
      console.log("data : " , data)
      if (data == "shrink"){
        document.getElementById('div1').className = 'shrink'
        document.getElementById('div2').className = 'shrink'

      }
      if (data == "grow"){
        document.getElementById('div1').className = 'grow'
        document.getElementById('div2').className = 'grow'

      }
    });


  }






}