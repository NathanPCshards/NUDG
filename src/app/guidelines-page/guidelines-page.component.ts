import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  rowSelected;

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
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.guidelines$ = this.guidelinesService
      .delete(id)
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
      
  }
  
  public onFormSubmit() {
}


  public openGuideline(id, guideline) {
    const dialogRef = this.dialog.open(guidelinesDialog, {
      width: '600px',
      height: '600px',
      autoFocus : false,
      data: {
        id,
        guideline
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result.data);//returns undefined
    });
  }



}
  



@Component({
  selector: 'guideline-dialog',
  templateUrl: 'guideline-dialog.html',
  styleUrls: ['dialog.scss']
})
export class guidelinesDialog {

  constructor(private dialogRef : MatDialogRef<guidelinesDialog>, @Inject(MAT_DIALOG_DATA) public data : any) { }

ngOnInit(){

}

closeDialog(){
  this.dialogRef.close({ data : "test"});

}


}