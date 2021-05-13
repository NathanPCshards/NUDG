import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { procedures } from '../models/procedures';
import { ProceduresService } from '../services/procedures.service';
import { tap } from 'rxjs/operators';
import { restAPI } from '../services/restAPI.service';
import { login } from '../injectables';




@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.scss']
})
export class ProcedureFormComponent implements OnInit {
  procedures$: Observable<procedures[]>;
  idOrgControls;
  rowSelected = false;
  searchProcedures
    constructor(
      private http:HttpClient, 
      private formBuilder: FormBuilder,  
      public dialog: MatDialog, 
      private procedureService : ProceduresService,
      private dialogRef : MatDialogRef<ProcedureFormComponent>, 
      private rest_service : restAPI,
      private loginInfo : login,
      @Inject(MAT_DIALOG_DATA) public data : any) { 
        this.idOrgControls = data.idOrgControls;

    }

    public openDialog(event) {
      let dialogRef = this.dialog.open(procedureDialog, {
        width: '1200px',
        height: '550px',
        minHeight: '550px',
        autoFocus : false,
        disableClose: true, //theres an issue here when the dialog is closed and submit is not pressed. 

        data: {
          idOrgControls:this.idOrgControls
        },
  
      });
      dialogRef.afterClosed().subscribe(result => {

        this.procedures$ = this.rest_service
        .post(`http://localhost:3000/milestones/${this.idOrgControls}/${this.loginInfo.CompanyName}`,result)
        .pipe(tap(() => (this.procedures$ = this.fetchAll(this.idOrgControls))));
      });

    }
    public filterprocedure()
    {
      //by updating search, the html data binding updates and the filter is automatically applied.
      this.searchProcedures = (<HTMLInputElement>document.getElementById("searchprocedure")).value.toLowerCase()
    }
  
  ngOnInit(){
 
    this.procedures$ = this.fetchAll(this.idOrgControls);

    // this.milestones$ = this.fetchAll(this.idOrgWeaknesses);
    this.procedureService.onClick.subscribe(data =>{
      this.procedures$ = this.rest_service
      .post(`http://localhost:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`,data)
      .pipe(tap(() => (this.procedures$ = this.fetchAll(this.idOrgControls))));
    })

  }
  ngAfterViewInit(){
  
  }
  
  fetchAll(idOrgControls): Observable<procedures[]> {
    return this.rest_service.get(`http://localhost:3000/procedures/${idOrgControls}/${this.loginInfo.CompanyName}`);
  }



delete(id: any): void {
  let temp =  this.rest_service.delete(`http://localhost:3000/procedures/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.procedures$ = this.fetchAll(id))));

  temp.subscribe()
    
}

}



@Component({
  selector: 'procedure-dialog',
  templateUrl: 'procedure.html',
  styleUrls: ['./procedure-form.component.scss']

})
export class procedureDialog {
idOrgControls
todaysDate = new Date()
submitted= false;
constructor(private http:HttpClient,
  private formBuilder: FormBuilder,
  private rest_service : restAPI,
  private loginInfo : login,
  private dialogRef : MatDialogRef<procedureDialog>, 
  private milestoneService : ProceduresService,
  @Inject(MAT_DIALOG_DATA) public data : any
  ) { 
  }
ngOnInit(){
  this.idOrgControls = this.data.idOrgControls

}

public procedureSubmit(value) {

}


public onFormReset() {

this.submitted = false;


}   


closeDialog( PProcedure, Pstatus, PstatusDate, Pdescription){
  this.data.PProcedure = PProcedure;
  this.data.Pstatus = Pstatus;

  this.data.PstatusDate = PstatusDate;
  if (!PstatusDate){
    this.data.PstatusDate = this.todaysDate
  }
  this.data.Pdescription = Pdescription;

  this.data.idOrgControls = this.idOrgControls


try{
  //this works when opened as a dialog (the weakness page)
  //but fails when used only as a form (policy/identifier page)
  this.dialogRef.close( this.data );
}
 
  catch(err){
    //in the case that it fails, we instead emit a signal for a different component to listen to
    //and send a post request for us. (this is received by weaknessTable in identifier-page.component.ts) 3/25
    this.milestoneService.emit(this.data)
  }


};
fetchAll(): Observable<procedures[]> {
  return this.rest_service.get(`http://localhost:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`);
}




}   
