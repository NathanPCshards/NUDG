import { Component, Input } from '@angular/core';
import { PolicyAccordionService } from '../services/policy-accordion.service';

@Component({
  selector: 'app-accordion-item',
  template: `
  <dt (click)="onBtnClick();" disabled="true">
  {{entry.title}} 
  <button mat-raised-button type="button" style="color: white;margin-left:40%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showControl();$event.stopPropagation()"><i class="fa fa-plus"></i> Control</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showWeakness();$event.stopPropagation();"><i class="fa fa-plus"></i>Weakness</button>
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showStandard();$event.stopPropagation();"><i class="fa fa-plus"></i>Standard</button>    

  </dt>
<dd class="{{uncollapsed ? 
  'uncollapsed' : 
  'uncollapsed collapsed'}}">{{entry.description}}    

  <weakness-dialog id="weakness" style="position:absolute; visibility : hidden;">
  </weakness-dialog>

  <control-dialog id="control" style="position:absolute; width:100%;">
  </control-dialog>


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

  showControl(){
    document.getElementById("control").style.visibility="visible"
    document.getElementById("weakness").style.visibility="hidden"
   // document.getElementById("standard").style.visibility="hidden"


  }
  showWeakness(){
    document.getElementById("control").style.visibility="hidden"
    document.getElementById("weakness").style.visibility="visible"
  //  document.getElementById("standard").style.visibility="hidden"
  }
  showStandard(){
    document.getElementById("control").style.visibility="hidden"
    document.getElementById("weakness").style.visibility="hidden"
  //  document.getElementById("standard").style.visibility="visible"
  }




}
