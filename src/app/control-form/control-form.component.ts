
import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { ControlsService } from '../services/controls.service';
import { SharedService } from '../services/Shared';
import { SharedResourcesService } from '../services/shared-resources.service';
import { StandardsService } from '../services/standards.service';
import { WeaknessesService } from '../services/weaknesses.service';
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
    // .pipe(tap(() => (this.controls$ = this.fetchAll())));
    });

  }

  ngOnInit(){

  }
  /*
  fetchAll(): Observable<controls[]> {
    return this.controlssservice.fetchAll();
  }*/
  
  delete(id: any): void {
    this.controls$ = this.controlssservice
      .delete(id)
     // .pipe(tap(() => (this.controls$ = this.fetchAll())));
      
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
standards$;
resources$
displayStandards$;
displayResources$
displayWeakness$
weakness$
todaysDate = new Date()
@Input()

//setting defualt ID
public id$;

constructor(

  @Optional() private dialogRef : MatDialogRef<weaknessDialog>,
  @Inject(MAT_DIALOG_DATA) public data : any,
  public controlsservice : ControlsService,
  public standardservice : StandardsService,
  public sharedResourceService : SharedResourcesService,
  public weaknessService : WeaknessesService
  ) { }

ngOnInit(){
  //Getting standards
  this.standards$ = this.standardservice.fetchAll(this.id$)
  this.displayStandards$ = []
  this.standards$.forEach(standardarray => {
    standardarray.forEach(standard => {
        this.displayStandards$.push(standard)
    });
  });
  //Getting resources
  this.resources$ = this.sharedResourceService.fetchAll()
  this.displayResources$ = []
  this.resources$.forEach(resourcesArray => {
    resourcesArray.forEach(resource => {
        this.displayResources$.push(resource)
    });
  });
  //Getting weaknesses
  this.weakness$ = this.weaknessService.fetchAll(this.id$)
  this.displayWeakness$ = []
  this.weakness$.forEach(weaknessArray => {

    weaknessArray.forEach(weakness => {

        this.displayWeakness$.push(weakness)
    });
  });

}


closeDialog(Nid , Cname, Coverview, Cissuedate, WriCsharedresourcesskRating, Curl, idOrgWeaknesses){
  this.data.Nid = this.id$
  this.data.Cname = Cname;
  this.data.Coverview = Coverview;
  this.data.Cissuedate = Cissuedate;
  this.data.Csharedresources = WriCsharedresourcesskRating;
  this.data.Curl = Curl;
  this.data.idOrgWeaknesses = idOrgWeaknesses
 

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

/*
fetchAll(): Observable<controls[]> {
  return this.controlsservice.fetchAll();
}*/
getid$(): string { return this.id$; }
setid$(id$: string) {
  this.id$ = (id$);
}


}
