
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { ControlsService } from '../services/controls.service';
import { SharedService } from '../services/Shared';
import { weaknessDialog } from '../weakness-form/weakness-form.component';


@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styleUrls: ['./control-form.component.scss']
})
export class ControlFormComponent implements OnInit {
  panelOpenState = false;
  controls$: Observable<controls[]>;

  constructor(public dialog: MatDialog, private sharedService: SharedService, public controlssservice : ControlsService){
  }

  public openDialog() {
      const dialogRef =this.dialog.open(controlDialog, {
      height: '80%',
       width:"85%",
       disableClose: true, //theres an issue here when the dialog is closed and submit is not pressed. 
       data: {
        Nid:""

    }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result : " , result);
      this.controls$ = this.controlssservice
      .post(result)
      .pipe(tap(() => (this.controls$ = this.fetchAll())));
    });

  }

  ngOnInit(){

  }
  fetchAll(): Observable<controls[]> {
    return this.controlssservice.fetchAll();
  }
  
  delete(id: any): void {
    this.controls$ = this.controlssservice
      .delete(id)
      .pipe(tap(() => (this.controls$ = this.fetchAll())));
      
  }

}

@Component({
  selector: 'control-dialog',
  templateUrl: 'controlForm.html',
  styleUrls: ['./control-form.component.scss']

})
export class controlDialog {
controlForm;

controls$: Observable<controls[]>;

position;
procedure;

constructor(

  @Optional() private dialogRef : MatDialogRef<weaknessDialog>,
  @Inject(MAT_DIALOG_DATA) public data : any,
  public controlsservice : ControlsService
  ) { }

ngOnInit(){
  this.controls$ = this.fetchAll();

}


closeDialog(Nid , Cname, Coverview, Cissuedate, WriCsharedresourcesskRating, Curl){
  this.data.Nid = Nid;
  this.data.Cname = Cname;
  this.data.Coverview = Coverview;
  this.data.Cissuedate = Cissuedate;
  this.data.Csharedresources = WriCsharedresourcesskRating;
  this.data.Curl = Curl;
 

try{
  //this works when opened as a dialog (the weakness page)
  //but fails when used only as a form (policy/identifier page)
  this.dialogRef.close( this.data );
}
 
  catch(err){
    //in the case that it fails, we instead emit a signal for a different component to listen to
    //and send a post request for us. (this is received by weaknessTable in identifier-page.component.ts) 3/25
    this.controlsservice.emit(this.data)
  }


};
fetchAll(): Observable<controls[]> {
  return this.controlsservice.fetchAll();
}



}
