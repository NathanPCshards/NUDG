import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild , AfterViewInit, Inject, Optional, Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import { login } from '../injectables';
import { weaknesses } from '../models/weaknesses';
import { inventoryService } from '../services/inventory.service';
import { restAPI } from '../services/restAPI.service';
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
    public weaknessservice : WeaknessesService,
    private loginInfo : login,
 

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

      this.weaknesses$ = this.weaknessservice
      .post(result,this.loginInfo.CompanyName)
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
      .delete(id,this.loginInfo.CompanyName)
     // .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
      
  }


}




//this is the component you see in policy page
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
todaysDate = new Date()
standards$
vendorsProducts$
assetIdentifiers$

  constructor(
    private formBuilder: FormBuilder,
    @Optional() private dialogRef : MatDialogRef<weaknessDialog>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public weaknessservice : WeaknessesService,
    private rest_service : restAPI,
    private inventoryService : inventoryService,
    private loginInfo : login
    ) { }

ngOnInit(){
  //Getting standards
  this.standards$ = this.rest_service.get(`http://192.168.0.70:3000/standards/${this.id$}/${this.loginInfo.CompanyName}`)
  //Getting vendor's products
  this.vendorsProducts$ = this.rest_service.get(`http://192.168.0.70:3000/vendors/${this.loginInfo.CompanyName}`);
  //Getting Asset Identifier from inventory 
  this.assetIdentifiers$ = this.rest_service.get(`http://192.168.0.70:3000/inventories/${this.loginInfo.CompanyName}`);

  this.standards$.forEach(element => {
    console.log("element : " , element)
  });

}
public onFormSubmit() {

}

public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}

closeDialog(Nid , Wname, WdetectionDate, WvendorDependency, WriskRating, WriskAdjustment, WadjustedRiskRating, WdetectionSource, WcompletionDate, WremediationPlan, WautoApprove, WoperationReq, Wstatus, WassetID, WlastChange, Wdescription, WlastVendorCheck, WdeviationRationale, WfalsePositive, WpointOfContact, WresourceReq, WsupportingDoc, Standards, WvendorsProduct, Wcomment, WsourceIdentifier ){
  this.data.Nid = this.id$
  this.data.Wname = Wname ? Wname : "";
  this.data.WdetectionDate = WdetectionDate ? WdetectionDate : "";
  this.data.WvendorDependency = WvendorDependency ? WvendorDependency : "" ;
  this.data.WriskRating = WriskRating ? WriskRating : "";
  this.data.WriskAdjustment = WriskAdjustment ? WriskAdjustment : "";
  this.data.WadjustedRiskRating = WadjustedRiskRating ? WadjustedRiskRating : "";
  this.data.WdetectionSource = WdetectionSource ? WdetectionSource : "";
  this.data.WcompletionDate = WcompletionDate ? WcompletionDate : "";
  this.data.WremediationPlan = WremediationPlan;
  this.data.WautoApprove = WautoApprove ? WautoApprove : "";
  this.data.WoperationReq = WoperationReq;
  this.data.Wstatus = Wstatus ? Wstatus : "";
  this.data.WassetID = WassetID;
  this.data.WlastChange = WlastChange ? WlastChange : "";
  this.data.Wdescription = Wdescription;
  this.data.WlastVendorCheck = WlastVendorCheck ? WlastVendorCheck : "";
  this.data.WdeviationRationale = WdeviationRationale;
  this.data.WfalsePositive = WfalsePositive ? WfalsePositive : "";
  this.data.WpointOfContact = WpointOfContact  ? WpointOfContact : "";
  this.data.WresourceReq = WresourceReq ? WresourceReq : "";
  this.data.WsupportingDoc = WsupportingDoc ? WsupportingDoc : "" ;
  this.data.CompanyName = this.loginInfo.CompanyName
  this.data.Standards = Standards ? Standards : ""
  this.data.WvendorsProduct = WvendorsProduct ? WvendorsProduct : ""
  this.data.Wcomment = Wcomment ? Wcomment : ""
  this.data.WsourceIdentifier = WsourceIdentifier ? WsourceIdentifier : ""
  


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

