import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { tableEntry } from '../identifier-page/identifier-page.component';

export interface milestoneTable {
  position: number,
  id: string,
  desc: string,
  date: string,
}

class milestone implements milestoneTable {
  position: -1;
  id: 'Placeholder';
  desc: 'Placeholder';
  date: 'Placeholder';

  constructor (position, id, desc, date){
    this.position=position;
    this.id = id;
    this.desc = desc;
    this.date = date;
  }
}
const milestoneData: milestoneTable[] = [
  {position: 1, id: "W1", desc: 'Onboarding and Offboarding process created, written documentation on the handling of added or removed users.', date:'3/4/2020'},
  {position: 2, id: "W2", desc: 'Placeholder', date:'3/4/2020'},

];
let globalMilestoneData = new MatTableDataSource(milestoneData)

@Component({
  selector: 'milestoneForm',
  templateUrl: './milestone-form.component.html',
  styleUrls: ['./milestone-form.component.scss']
})
export class MilestoneFormComponent implements OnInit {
  dataSource: MatTableDataSource<milestoneTable>;
  selection = new SelectionModel<milestoneTable>(true, []);
  @ViewChild(MatSort) sort;
  
  clickEventsubscription;
  displayedColumns: string[] = ['select', 'id', 'desc', 'date'];
  
  rowSelected = false;
  
    constructor(private http:HttpClient, private formBuilder: FormBuilder,  public dialog: MatDialog) { 
      this.dataSource = new MatTableDataSource(milestoneData);
      globalMilestoneData.data = this.dataSource.data;

    }
    public openDialog(event) {
      this.dialog.open(milestoneDialog, {height:'40%', width:"40%",});
     // event.stopPropagation();  
    }
    public refresh(){
      this.dataSource.data = globalMilestoneData.data;
    }
  
  ngOnInit(){
  
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    /** The label for the checkbox on the passed row */
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
  if (value =="milestone"){
    console.log("milestone WAS SUBMITTED");
    this.submitted = true;
  
    const modal: milestoneTable = new milestone(this.position,this.id,this.desc, this.date);
  
  
    const temp = (globalMilestoneData.data);
    temp.push(modal)
    globalMilestoneData.data = temp;
  }

}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}
}   
