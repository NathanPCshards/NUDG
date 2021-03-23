import { Component, Input } from '@angular/core';
import { PolicyAccordionService } from '../services/policy-accordion.service';

@Component({
  selector: 'app-accordion-item',
  template: `
    <dt (click)="onBtnClick()">{{entry.title}}</dt>
    <dd class="{{uncollapsed ? 
      'uncollapsed' : 
      'uncollapsed collapsed'}}">{{entry.description}}    
      <div style="height: 350px; background-color: rebeccapurple; opacity:.3">
      </div></dd>
  `,  
  styleUrls: [ './policy-accordion.component.scss' ]
})
export class AccordionItemComponent  {
  @Input() entry: any;
  uncollapsed = false;
  collapse = true;
  //grow = false;
  shrink = false;
  constructor(private service: PolicyAccordionService ) { }

  ngOnInit() {
      
  }

//toggle for open and close appearances
  onBtnClick() {
    switch(this.uncollapsed){
        case true:
            console.log("does this happen????")
            this.uncollapsed = false;
            this.service.emit("grow")
            break;
        case false:
            this.uncollapsed = true;
            this.service.emit("shrink")
            break;
    }
  //  this.grow=true;
    
  }




}
