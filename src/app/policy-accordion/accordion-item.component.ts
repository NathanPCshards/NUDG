import { Component, Input } from '@angular/core';
import { PolicyAccordionService } from '../services/policy-accordion.service';

@Component({
  selector: 'app-accordion-item',
  template: `
  <dt (click)="onBtnClick()">{{entry.title}}
  <button mat-raised-button type="button" style="color: white;margin-left:30%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showControl();"><i class="fa fa-plus"></i> Control</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 10px;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showWeakness();"><i class="fa fa-plus"></i>Weakness</button>
  <button mat-raised-button type="button" style="color: white;margin-left: 10px;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showStandard();"><i class="fa fa-plus"></i>Standard</button>    

  </dt>
<dd class="{{uncollapsed ? 
  'uncollapsed' : 
  'uncollapsed collapsed'}}">{{entry.description}}    

  <weakness-dialog>
  </weakness-dialog>
</dd>
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
