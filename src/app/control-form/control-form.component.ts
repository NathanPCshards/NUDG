import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { controlTable } from '../identifier-page/identifier-page.component';
import { SharedService } from '../services/Shared';




export interface tableEntry {
  position: number;
  procedure: string;
  status: string;
  status_date: string;
  description: string;
}


const example_procedure: tableEntry[] = [
  {position: 1, procedure: "P1", status: 'None', status_date:'Today', description: 'Onboarding and Offboarding process created, written documentation on the handling of added or removed users test test test test test test test test .'},
  {position: 2, procedure: "P2", status: 'None', status_date:'Today', description: 'Placeholder'},
  {position: 3, procedure: "P3", status: 'None', status_date:'Today', description: 'Placeholder'},
  {position: 2, procedure: "P2", status: 'None', status_date:'Today', description: 'Placeholder'},
  {position: 3, procedure: "P3", status: 'None', status_date:'Today', description: 'Placeholder'},
  {position: 2, procedure: "P2",status: 'None', status_date:'Today',  description: 'Placeholder'},
  {position: 3, procedure: "P3",status: 'None', status_date:'Today',  description: 'Placeholder'},

];



export interface controlTemplate {
  position: number,

  controlID: string,
  description: string,
  date: string,
  procedure: string
}

class control implements controlTemplate{
  position: -1;

  controlID: 'Placeholder';
  description: 'Placeholder';
  date: 'Placeholder';
  procedure: 'Placeholder';

  constructor(position, controlID, description, date, procedure){
    this.position= position;
    this.controlID = controlID;
    this.description = description;
    this.date = date;
    this.procedure = procedure;
  }
}

const controlData: controlTemplate[] = [
  {position: 1,controlID: "C1", description:"This is a test", date: "3/4/2020" , procedure: "none"},
  {position: 2,controlID: "C2", description:"Second Test", date: "2/3/2020" , procedure: "Placeholder"},
  {position: 3,controlID: "C3", description:"Third", date: "1/3/2020" , procedure: "none"},


];
let globalControlData = new MatTableDataSource(controlData);

@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styleUrls: ['./control-form.component.scss']
})
export class ControlFormComponent implements OnInit {
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;
  displayedColumns: string[] = ['select','controlID', 'description', 'date', 'procedure'];
  rowSelected = false;
  name: any;
 
  dataSource: MatTableDataSource<controlTemplate>;
  selection = new SelectionModel<controlTemplate>(true, []);
  @ViewChild(MatSort) sort;


  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private sharedService: SharedService){
    this.dataSource = new MatTableDataSource(controlData);
    globalControlData.data = this.dataSource.data;
    
  }
  public openDialog() {
    this.dialog.open(controlDialog, {height: '80%', width:"85%",});

  }

  public refresh(){
    this.dataSource.data = globalControlData.data;
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;

  }

  ngOnInit(){

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

}



@Component({
  selector: 'control-dialog',
  templateUrl: 'controlForm.html',
  styleUrls: ['./control-form.component.scss']

})
export class controlDialog {
controlForm;
control_id;
description;
inpDate;
position;
procedure;
submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder, private sharedService: SharedService) { }

ngOnInit(){
  this.position = 3;
  this.controlForm = this.formBuilder.group({
   
    //initialize stuff to be null or whatever, here

  });
}
public onFormSubmit() {
  console.log("FORM WAS SUBMITTED");
  this.submitted = true;
  const configUrl = 'http://localhost:4200/home'; 
 

  const modal: controlTemplate = new control(this.position,this.control_id,this.description,this.inpDate,this.procedure);


  const temp = (globalControlData.data);
  temp.push(modal)
  globalControlData.data = temp;

 
}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}
}
