import { Component, Input } from '@angular/core';
import { PolicyAccordionService } from '../services/policy-accordion.service';

@Component({
  selector: 'app-accordion-item',
  template: `
  <dt (click)="onBtnClick();" disabled="true">
  {{entry.title}} 
  <button mat-raised-button type="button" style="color: white;margin-left:35%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showControl();$event.stopPropagation()"><i class="fa fa-plus"></i> Control</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showWeakness();$event.stopPropagation();"><i class="fa fa-plus"></i>Weakness</button>
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showFileUpload();$event.stopPropagation();"><i class="fa fa-plus"></i>Import</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="printPage();$event.stopPropagation();"><i class="fa fa-plus"></i>Print</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showGap();$event.stopPropagation();"><i class="fa fa-plus"></i>Gap</button>    


  </dt>
<dd class="{{uncollapsed ? 
  'uncollapsed' : 
  'uncollapsed collapsed'}}">{{entry.description}}    

  <weakness-dialog [id$]="id$" id="weakness" style="width:100%; position:absolute; visibility : hidden;">
  </weakness-dialog>

  <control-dialog [id$]="id$" id="control" style="position:absolute; width:100%;">
  </control-dialog>

  <app-file-import id="fileUpload" style="left:30%; position:absolute; visibility:hidden;"> </app-file-import>

  <gap-form id="gapForm" [id$] ="id$" style="position:absolute; width:100%; visibility:hidden"> </gap-form>

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
  @Input() 
  id$;
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
    document.getElementById("gapForm").style.visibility="hidden"
    document.getElementById("fileUpload").style.visibility="hidden"


  }
  showWeakness(){
    document.getElementById("control").style.visibility="hidden"
    document.getElementById("weakness").style.visibility="visible"
    document.getElementById("fileUpload").style.visibility="hidden"
    document.getElementById("gapForm").style.visibility="hidden"

  }
  showFileUpload(){
    document.getElementById("control").style.visibility="hidden"
    document.getElementById("weakness").style.visibility="hidden"
    document.getElementById("gapForm").style.visibility="hidden"
    document.getElementById("fileUpload").style.visibility="visible"
  }
  showGap(){
    document.getElementById("control").style.visibility="hidden"
    document.getElementById("weakness").style.visibility="hidden"
    document.getElementById("gapForm").style.visibility="visible"
    document.getElementById("fileUpload").style.visibility="hidden"
  }


  printPage() {
    window.print();
  }

}
