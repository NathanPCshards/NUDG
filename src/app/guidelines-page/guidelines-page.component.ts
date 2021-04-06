import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, inject, Inject, Injector, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { id } from 'date-fns/locale';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { guidelines } from '../models/guidelines';
import { GuidelinesService } from '../services/guidelines.service';

@Component({
  selector: 'app-guidelines-page',
  templateUrl: './guidelines-page.component.html',
  styleUrls: ['./guidelines-page.component.scss']
})
export class GuidelinesForm implements OnInit {
  panelOpenState = false;


  guidelines$: Observable<guidelines[]>;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private guidelinesService : GuidelinesService, public dialog : MatDialog ) {
   }

  ngOnInit(){
    this.guidelines$ = this.fetchAll();

  }
  fetchAll(): Observable<guidelines[]> {
    return this.guidelinesService.fetchAll();
  }
  
  post(inventoryItem: Partial<guidelines>): void {

  }
  

  delete(id: any): void {
    this.guidelines$ = this.guidelinesService
      .delete(id)
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
      
  }
  
  public onFormSubmit() {
}


  public openGuideline(id, guideline) {

      this.guidelinesService.openGuideline(id,guideline)



    /*
    let dialogRef = this.dialog.open(guidelinesDialog, {
      width: '700px',
      height: '700px',
      autoFocus : false,
      data: {
        id,
        guideline
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);//returns undefined
    });

*/
  }
}
  



@Component({
  selector: 'guideline-dialog',
  templateUrl: 'guideline-dialog.html',
  styleUrls: ['dialog.scss']
})
export class guidelinesDialog {
  id$;
  guideline$;
  @Input() type: string ="tesssst"
  @Output() output = new EventEmitter();

  constructor(private guidelinesService : GuidelinesService) { 
  
    this.id$ 
    this.guideline$ 
  }

ngOnInit(){
  this.output.emit("Random emit")
}

closeDialog(id,guideline){
  console.log("just testing close : " , id, guideline)
  this.guidelinesService.closeGuideline(id,guideline)
 // this.dialogRef.close();
};


}

/*
@Directive({
  selector: '[tooltip]'
})
export class GuidelineDirective {
  // We can pass string, template or component
  @Input('tooltip') content : any;
  
  private componentRef : ComponentRef<guidelinesDialog>;

  constructor( private element : ElementRef,
               private renderer : Renderer2,
               private injector: Injector,
               private resolver : ComponentFactoryResolver,
               private vcr : ViewContainerRef ) {
  }

}

*/

/*






 if ( this.componentRef ) return;
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.element.nativeElement
        }
      }
    ]);
    this.componentRef = this.vcr.createComponent(factory, 0, injector, this.generateNgContent());






*/