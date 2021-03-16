import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  clickEventsubscription;
  displayedColumns: string[] = ['select', 'id', 'desc', 'date'];
  
  rowSelected = false;
  
    constructor(private http:HttpClient, private formBuilder: FormBuilder,  
      public dialog: MatDialog, private milestonesService : MilestonesService) { 


    }
    public openDialog(event) {
      this.dialog.open(milestoneDialog, {height:'40%', width:"40%",});
     // event.stopPropagation();  
    }
    public refresh(){
     // this.dataSource.data = globalMilestoneData.data;
    }
  
  ngOnInit(){
    this.milestones$ = this.fetchAll();

  }
  ngAfterViewInit(){
  
  }
  
fetchAll(): Observable<milestones[]> {
  return this.milestonesService.fetchAll();
}

post(inventoryItem: Partial<milestones>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;
/*
  this.milestones$ = this.milestonesService
    .post({ name })
    .pipe(tap(() => (this.milestones$ = this.fetchAll())));*/
}


update(id: number, inventoryItem: Partial<milestones>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;
/*
  const newUsers: milestones = {
    id,
    name

  };

  this.milestones$ = this.milestonesService
    .update(newUsers)
    .pipe(tap(() => (this.milestones$ = this.fetchAll())));*/
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.milestones$ = this.milestonesService
    .delete(id)
    .pipe(tap(() => (this.milestones$ = this.fetchAll())));
    
}



}




@Component({
  selector: 'milestone-dialog',
  templateUrl: 'milestoneForm.html',
  styleUrls: ['./milestone-form.component.scss']

})
export class milestoneDialog {
value;
milestoneForm;
position;
id;
desc;
date;
milestones;
displayedColumns: String[] = ['select','id', 'desc','date'];


submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.milestoneForm = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public milestoneSubmit(value) {
  /*
  console.log("milestone submit reached value : " , value)
  if (value =="milestoneForm"){
    console.log("milestone WAS SUBMITTED");
    this.submitted = true;
  
    const modal: milestoneTable = new milestone(this.position,this.id,this.desc, this.date);
  
  
    const temp = (globalMilestoneData.data);
    temp.push(modal)
    globalMilestoneData.data = temp;
  }*/

}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}
}   




/* old table functions


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
    
    checkboxLabel(row?: milestoneTable): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    
    
    removeSelectedRows() {
      console.log("delete rows called in group")
        let data = Object.assign(milestoneData)
        this.selection.selected.forEach(item => {
           let index: number = data.findIndex(d => d === item);
           console.log(data.findIndex(d => d === item));
           data.splice(index,1)
           this.dataSource = new MatTableDataSource<milestoneTable>(data);
         });
         this.selection = new SelectionModel<milestoneTable>(true, []);
      
    }
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



*/