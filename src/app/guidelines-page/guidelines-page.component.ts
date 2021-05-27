import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, HostListener, inject, Inject, Injector, Input, OnInit, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    return this.rest_service.get(`http://192.168.0.70:3000/guidelines/${this.loginInfo.CompanyName}`);
  }
  
  post(inventoryItem: Partial<guidelines>): void {

  }
  

  delete(id: any): void {
    let temp = this.rest_service
      .delete(`http://192.168.0.70:3000/guidelines/${id}/${this.loginInfo.CompanyName}`)
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
    temp.subscribe()
      
  }
  
  public onFormSubmit() {
}


  public openGuideline(Nid, guideline) {
      this.guidelinesService.openGuideline(Nid,guideline)
  }
}
  

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'guidelines-dialog',
  templateUrl: 'guideline-dialog.html',
  styleUrls: ['dialog.scss']
})
export class guidelinesDialog {


 @Input('id$') public id$;
 
 desc$;
 left$;
 top$;
 guideline$
  @Output() output = new EventEmitter();


  public unique_key: number;
  public parentRef: IdentifierPageComponent;



  constructor(private guidelinesService : GuidelinesService, private rest_service : restAPI, private loginInfo : login) { 
 
  }

ngOnInit(){

      this.guideline$ = this.getByID(this.id$)
      this.guideline$.subscribe()
  
      



  }
  ngAfterViewInit(){

  }

  getByID(id){
    return this.rest_service.get(`http://192.168.0.70:3000/guidelines/${this.loginInfo.CompanyName}?getByID=${id}`)
  }

  public openGuideline(id, guideline, Nid=null) {

    this.guidelinesService.openGuideline(id,guideline)
  }

  public closeGuideline(){

  }

  closeDialog(id,guideline){
  // this.parentRef.closeGuideline(this.unique_key)
  };


}

