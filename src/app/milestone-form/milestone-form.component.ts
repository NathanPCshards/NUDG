import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
//@ts-ignore
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { milestones } from '../models/milestones';
import { Observable } from 'rxjs';
import { MilestonesService } from '../services/milestones.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'milestoneForm',
  templateUrl: './milestone-form.component.html',
  styleUrls: ['./milestone-form.component.scss']
})
export class MilestoneFormComponent implements OnInit {

  milestones$: Observable<milestones[]>;
  idOrgWeaknesses;
  clickEventsubscription;
  searchMilestones
  rowSelected = false;
  
    constructor(
      private http:HttpClient, 
      private formBuilder: FormBuilder,  
      public dialog: MatDialog, 
      private milestonesService : MilestonesService,
      private dialogRef : MatDialogRef<MilestoneFormComponent>, 
      @Inject(MAT_DIALOG_DATA) public data : any) { 
        this.idOrgWeaknesses = data;

    }
    public openDialog(event) {
      let dialogRef = this.dialog.open(milestoneDialog, {
        width: '1200px',
        height: '550px',
        minHeight: '550px',
        autoFocus : false,
        data: {
          idOrgWeaknesses:this.idOrgWeaknesses
        },
  
      });
      dialogRef.afterClosed().subscribe(result => {

        this.milestones$ = this.milestonesService
        .post(result)
        .pipe(tap(() => (this.milestones$ = this.fetchAll(this.idOrgWeaknesses))));
      });
  


  }


  public filterMilestone()
  {
    //by updating search, the html data binding updates and the filter is automatically applied.
    this.searchMilestones = (<HTMLInputElement>document.getElementById("searchMilestones")).value.toLowerCase()
  }


  ngOnInit(){
    this.milestones$ = this.fetchAll(this.idOrgWeaknesses);

        // this.milestones$ = this.fetchAll(this.idOrgWeaknesses);
        this.milestonesService.onClick.subscribe(data =>{
          this.milestones$ = this.milestonesService
          .post(data)
          .pipe(tap(() => (this.milestones$ = this.fetchAll(this.idOrgWeaknesses))));
        })
  }

  
fetchAll(idOrgWeaknesses): Observable<milestones[]> {

  return this.milestonesService.fetchAll(idOrgWeaknesses.idOrgWeaknesses);
}

delete(id: any): void {
  this.milestones$ = this.milestonesService
    .delete(id)
    .pipe(tap(() => (this.milestones$ = this.fetchAll(this.idOrgWeaknesses))));
    
}



}




@Component({
  selector: 'milestone-dialog',
  templateUrl: 'milestoneForm.html',
  styleUrls: ['./milestone-form.component.scss']

})
export class milestoneDialog {

milestoneForm;
position;

idOrgWeaknesses


submitted= false;
  constructor(private http:HttpClient,
     private formBuilder: FormBuilder,
     private dialogRef : MatDialogRef<milestoneDialog>, 
     private milestoneService : MilestonesService,
     @Inject(MAT_DIALOG_DATA) public data : any
     ) { 
     }

ngOnInit(){
  this.idOrgWeaknesses = this.data.idOrgWeaknesses.idOrgWeaknesses;
}
public milestoneSubmit(value) {

}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}

closeDialog( Milestones, Mstatus, MstatusDate, McompletionDate, Mchanges){
  this.data.Milestones = Milestones;
  this.data.Mstatus = Mstatus;
  this.data.MstatusDate = MstatusDate;
  this.data.McompletionDate = McompletionDate;
  this.data.Mchanges = Mchanges;
  this.data.idOrgWeaknesses = this.idOrgWeaknesses


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
fetchAll(): Observable<milestones[]> {
  return this.milestoneService.fetchAll(this.idOrgWeaknesses);
}





}   


