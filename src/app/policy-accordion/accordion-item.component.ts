import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { login } from '../injectables';
import { PolicyAccordionService } from '../services/policy-accordion.service';
import { restAPI } from '../services/restAPI.service';

@Component({
  selector: 'app-accordion-item',
  template: `
  <dt (click)="onBtnClick();" disabled="true" >
  {{entry.title}} 
  <mat-icon  class="arrow back"(click)="routeBackward();$event.stopPropagation()">arrow_back_ios</mat-icon>

  <button mat-raised-button type="button" style="color: white;margin-left:35%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showControl();$event.stopPropagation()"><i class="fa fa-plus"></i> Control</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showWeakness();$event.stopPropagation();"><i class="fa fa-plus"></i>Weakness</button>
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showFileUpload();$event.stopPropagation();"><i class="fa fa-plus"></i>Import</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="printPage();$event.stopPropagation();"><i class="fa fa-plus"></i>Print</button>    
  <button mat-raised-button type="button" style="color: white;margin-left: 3%;background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);" class="accordionButton" (click)="showGap();$event.stopPropagation();"><i class="fa fa-plus"></i>Gap</button>    
  <mat-icon class="arrow forward" (click)="routeForward();$event.stopPropagation()">arrow_forward_ios</mat-icon>


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
  subscription$
  policies
  pointer

  constructor(
    private service: PolicyAccordionService,
    private rest_service : restAPI ,
    private loginInfo : login,
    private router:Router, 

    ) { }

  async ngOnInit() {
    console.log("parent ref in accordion : " , this.parentReference$)

    console.log("id : " , this.id$)


    this.subscription$ = await this.rest_service.get(`http://localhost:3000/Policy/${'All'}/${this.loginInfo.CompanyName}`).toPromise()
    this.policies = []
    this.subscription$.forEach(policy => {
      this.policies.push(policy)
      this.policies.sort(function(a,b){
        return a.nudgid > b.nudgid
     })
    });

    let index = 0
    this.policies.forEach(element => {
      if (element.nudgid == this.id$){
        this.pointer = index
      }
      index ++
    });
   


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

  routeForward(){

    if ( this.pointer < this.policies.length){
      this.pointer += 1;
    }

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["Policy/"+this.policies[this.pointer].nudgid]));

  }
  routeBackward(){
    if (this.pointer > 0){
      this.pointer -= 1;
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["Policy/"+this.policies[this.pointer].nudgid]));
  }

  printPage() {
    window.print();
  }

}
