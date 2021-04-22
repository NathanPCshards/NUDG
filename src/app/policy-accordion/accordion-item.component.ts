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

  <weakness-dialog [id$]="id$" id="weakness" style="width:100%; position:absolute; display:none">
  </weakness-dialog>

  <control-dialog [id$]="id$" id="control" style="position:absolute; width:100%;">
  </control-dialog>

  <app-file-import id="fileUpload" style="left:30%; position:absolute; display:none;"> </app-file-import>

  <gap-form id="gapForm" [id$] ="id$" [displayDate$] ="Gdate$" [parentReference$] = "parentReference$" style="position:absolute; width:100%; display:none"> </gap-form>

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
  @Input()
  Gdate$;
  @Input()
  parentReference$;
  constructor(private service: PolicyAccordionService ) { }

  ngOnInit() {
    console.log("parent ref in accordion : " , this.parentReference$)
      
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
    document.getElementById("control").style.display="flex"
    document.getElementById("weakness").style.display="none"
    document.getElementById("gapForm").style.display="none"
    document.getElementById("fileUpload").style.display="none"


  }
  showWeakness(){
    document.getElementById("control").style.display="none"
    document.getElementById("weakness").style.display="flex"
    document.getElementById("fileUpload").style.display="none"
    document.getElementById("gapForm").style.display="none"

  }
  showFileUpload(){
    document.getElementById("control").style.display="none"
    document.getElementById("weakness").style.display="none"
    document.getElementById("gapForm").style.display="none"
    document.getElementById("fileUpload").style.display="inline"
  }
  showGap(){
    document.getElementById("control").style.display="none"
    document.getElementById("weakness").style.display="none"
    document.getElementById("gapForm").style.display="flex"
    document.getElementById("fileUpload").style.display="none"
  }


  printPage() {
    window.print();
  }

}
