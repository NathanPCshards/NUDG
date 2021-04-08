import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild , AfterViewInit, Inject, Optional, Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import { weaknesses } from '../models/weaknesses';
import { SharedService } from '../services/Shared';
import { WeaknessesService } from '../services/weaknesses.service';


@Component({
  selector: 'app-weakness-form',
  templateUrl: './weakness-form.component.html',
  styleUrls: ['./weakness-form.component.scss']
})
export class WeaknessFormComponent implements OnInit {

  
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;
  displayedColumns: String[] = ['select','id', 'desc'];
  rowSelected = false;
  name: any;

  weaknesses$: Observable<weaknesses[]>;

  @ViewChild(MatSort) sort;


  //Database variables
  isLoadingResults = false;
  isRateLimitReached
  resultsLength


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public weaknessservice : WeaknessesService
    ){
    
  }
  public openDialog() {
    const dialogRef = this.dialog.open(weaknessDialog, {
      width: '80%',
      height: '90%',
      disableClose: true, //theres an issue here when the dialog is closed and submit is not pressed. 
  
      data: {
              Nid:""
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result : " , result);
      this.weaknesses$ = this.weaknessservice
      .post(result)
     // .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
    });



  }

  


  ngOnInit(){
  //  this.weaknesses$ = this.fetchAll()

  }
  /*fetchAll(): Observable<weaknesses[]> {
    return this.weaknessservice.fetchAll();
  }*/
  
  delete(id: any): void {
    this.weaknesses$ = this.weaknessservice
      .delete(id)
     // .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
      
  }


}



@Component({
  selector: 'weakness-dialog',
  templateUrl: 'weaknessForm.html',
  styleUrls: ['./weakness-form.component.scss']

})
export class weaknessDialog {
weaknessForm;
@Input()
id$;
submitted= false;
weaknesses$: Observable<weaknesses[]>;


  constructor(
    private formBuilder: FormBuilder,
    @Optional() private dialogRef : MatDialogRef<weaknessDialog>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public weaknessservice : WeaknessesService
    ) { }

ngOnInit(){

  this.weaknessForm = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public onFormSubmit() {

}

public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}

closeDialog(Nid , Wname, WdetectionDate, WvendorDependency, WriskRating, WriskAdjustment, WadjustedRiskRating, WdetectionSource, WcompletionDate, WremediationPlan, WautoApprove, WoperationReq, Wstatus, WassetID, WlastChange, Wdescription, WlastvendorCheck, WdeviationRationale, WfalsePositive, WpointOfContact, WresourceReq, WsupportingDoc ){
  this.data.Nid = this.id$
  this.data.Wname = Wname;
  this.data.WdetectionDate = WdetectionDate;
  this.data.WvendorDependency = WvendorDependency;
  this.data.WriskRating = WriskRating;
  this.data.WriskAdjustment = WriskAdjustment;
  this.data.WadjustedRiskRating = WadjustedRiskRating;
  this.data.WdetectionSource = WdetectionSource;
  this.data.WcompletionDate = WcompletionDate;
  this.data.WremediationPlan = WremediationPlan;
  this.data.WautoApprove = WautoApprove;
  this.data.WoperationReq = WoperationReq;
  this.data.Wstatus = Wstatus;
  this.data.WassetID = WassetID;
  this.data.WlastChange = WlastChange;
  this.data.Wdescription = Wdescription;
  this.data.WlastvendorCheck = WlastvendorCheck;
  this.data.WdeviationRationale = WdeviationRationale;
  this.data.WfalsePositive = WfalsePositive;
  this.data.WpointOfContact = WpointOfContact;
  this.data.WresourceReq = WresourceReq;
  this.data.WsupportingDoc = WsupportingDoc;

try{
  //this works when opened as a dialog (the weakness page)
  //but fails when used only as a form (policy/identifier page)
  this.dialogRef.close( this.data );
}
 
  catch(err){
    //in the case that it fails, we instead emit a signal for a different component to listen to
    //and send a post request for us. (this is received in identifier-page.component.ts, by subscribe in INIT) 3/25
    this.weaknessservice.emit(this.data)
  }


};/*
fetchAll(): Observable<weaknesses[]> {
  return this.weaknessservice.fetchAll();
}*/
}   

