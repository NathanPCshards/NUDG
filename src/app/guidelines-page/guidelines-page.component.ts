import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, HostListener, inject, Inject, Injector, Input, OnInit, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { id } from 'date-fns/locale';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdentifierPageComponent } from '../identifier-page/identifier-page.component';
import { login } from '../injectables';
import { guidelines } from '../models/guidelines';
import { GuidelinesService } from '../services/guidelines.service';
import { restAPI } from '../services/restAPI.service';

@Component({
  selector: 'app-guidelines-page',
  templateUrl: './guidelines-page.component.html',
  styleUrls: ['./guidelines-page.component.scss']
})
export class GuidelinesForm implements OnInit {
  panelOpenState = false;


  guidelines$: Observable<guidelines[]>;


  constructor(private http:HttpClient, 
    private formBuilder: FormBuilder, 
    private guidelinesService : GuidelinesService, 
    public dialog : MatDialog, 
    private rest_service : restAPI,
    private loginInfo : login ) {
   }

  ngOnInit(){
    this.guidelines$ = this.fetchAll();

  }
  fetchAll(): Observable<guidelines[]> {
    return this.rest_service.get(`http://localhost:3000/guidelines/${this.loginInfo.CompanyName}`);
  }
  
  post(inventoryItem: Partial<guidelines>): void {

  }
  

  delete(id: any): void {
    let temp = this.rest_service
      .delete(`http://localhost:3000/guidelines/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
    temp.subscribe()
      
  }
  
  public onFormSubmit() {
}


  public openGuideline(id, guideline) {

      this.guidelinesService.openGuideline(id,guideline)
  }
}
  

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'guideline-dialog',
  templateUrl: 'guideline-dialog.html',
  styleUrls: ['dialog.scss']
})
export class guidelinesDialog {
  id$;
  desc$;
  left$;
  top$;
 //this is code from back when i tried making the guideline box-popout resizable, but it didnt work out.
 @Input('width') public width: number = 590;
 @Input('height') public height: number = 450;
 @Input('left') public left: number;
 @Input('top') public top: number;
 @ViewChild("box") public box: ElementRef;
 public boxPosition: { left: number, top: number };
 public containerPos: { left: number, top: number, right: number, bottom: number };
 public mouse: {x: number, y: number}
 public status: Status = Status.OFF;
 private mouseClick: {x: number, y: number, left: number, top: number}
  @Output() output = new EventEmitter();


  public unique_key: number;
  public parentRef: IdentifierPageComponent;



  constructor(private guidelinesService : GuidelinesService) { 
  
    this.id$ 
    this.desc$ 
  }

ngOnInit(){

  }
  ngAfterViewInit(){
    this.loadBox();
    this.loadContainer();
  }
  private loadBox(){
    const {left, top} = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};
  }

  private loadContainer(){
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = { left, top, right, bottom };
  }

  setStatus(event: MouseEvent, status: number){
    if(status === 1) event.stopPropagation();
    else if(status === 2) this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
    else this.loadBox();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = { x: event.clientX, y: event.clientY };
    console.log("status " , status)
    if(this.status === Status.RESIZE) this.resize();
  }

  private resize(){
    if(this.resizeCondMeet()){
      this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
    }
  }

  private resizeCondMeet(){
    return (this.mouse.x < this.containerPos.right && this.mouse.y < this.containerPos.bottom);
  }



closeDialog(id,guideline){
 // this.parentRef.closeGuideline(this.unique_key)
};


}

