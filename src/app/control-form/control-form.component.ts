import { HttpClient } from '@angular/common/http';
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


  submitted = false;
  results;// = res.json();
  panelOpenState = false;

  controls$: Observable<controls[]>;



  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private sharedService: SharedService, public controlssservice : ControlsService){
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


  ngAfterViewInit(){

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
submitted= false;
constructor(
  private formBuilder: FormBuilder,
  @Optional() private dialogRef : MatDialogRef<weaknessDialog>,
  @Inject(MAT_DIALOG_DATA) public data : any,
  public controlsservice : ControlsService
  ) { }
ngOnInit(){
  this.controls$ = this.fetchAll();
  this.controlForm = this.formBuilder.group({
   
    //initialize stuff to be null or whatever, here

  });
}


/*
post(Nid, Cname, Coverview, Cissuedate, Csharedresources, Curl ): void {
//console.log(Nid,Cname,Coverview,Cissuedate,Csharedresources,Curl)
   
   this.controls$ = this.controlsservice
     .post({ Nid, Cname, Coverview, Cissuedate, Csharedresources, Curl })
     .pipe(tap(() => (this.controls$ = this.fetchAll())));
     console.log("post from ctrl")
 }
*/



public onFormReset() {
  console.log("FORM WAS Reset");
  this.submitted = false;
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

/*

onRowClicked(row): void {
  console.log("Row clicked: ", row);
  this.rowSelected = true;
  var configUrl = 'http://localhost:4200' + "/" + row.Title;
  console.log(configUrl)
 // this.router.navigate(configUrl.concat("/",row.Title))
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();


}


isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

checkboxLabel(row?: controlTemplate): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


removeSelectedRows() {
  let data = Object.assign(controlData)
  this.selection.selected.forEach(item => {
     let index: number = data.findIndex(d => d === item);
     console.log(data.findIndex(d => d === item));
     data.splice(index,1)
     this.dataSource = new MatTableDataSource<controlTemplate>(data);
   });
   this.selection = new SelectionModel<controlTemplate>(true, []);
}

*/