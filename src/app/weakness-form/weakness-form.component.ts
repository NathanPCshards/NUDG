import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
import { weaknesses } from '../models/weaknesses';
import { SharedService } from '../services/Shared';
import { WeaknessesService } from '../services/weaknesses.service';


export interface tableEntry {
  position: number;
  desc: string;
  id: string;
}

export interface weaknessTable {
  position: number,
  id: string,
  desc: string,
  milestones: string,
}

class weakness implements weaknessTable {
  position: -1;
  id: 'Placeholder';
  desc: 'Placeholder';
  milestones: 'Placeholder';

  constructor (position, id, desc, milestones ){
    this.position=position;
    this.id = id;
    this.desc = desc;
    this.milestones = milestones;
  }
}


const weaknessData: weaknessTable[] = [
  {position: 1,id: "W1", desc:"This is a test", milestones : "temp" },
  {position: 2,id: "W2", desc:"Second Test",milestones : " temp"},
  {position: 3,id: "W3", desc:"Description would go here", milestones  : "temp"},


];



export interface userTable {
  position: number;
  name: string,
  employeeNumber : string,
  jobTitle: string,
  jobRole: string,
  employeeType : string,
  department : string,
  hireDate : string,
  logonHours : string,
  emailAddress : string,
  phone : string,
  address : string,
  CUIdata : string,
}

const User_Data: userTable[] = [
  {position: 1, name : "Test" ,employeeNumber : "Test",jobTitle : "placeholder",jobRole : "Test",employeeType: "Test",
  department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

  {position:2,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
    department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

    {position: 3,name : "Weakness" ,employeeNumber : "Table",jobTitle : "filler",jobRole : "Test",employeeType: "Test",
    department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

    {position: 4,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
      department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

      {position: 5,name : "stuff" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
      department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

      {position: 6,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
        department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},
];

let globalWeaknessData = new MatTableDataSource(weaknessData);

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

  dataSource!: MatTableDataSource<weaknessTable>;
  selection = new SelectionModel<weaknessTable>(true, []);
  @ViewChild(MatSort) sort;


  //Database variables
  isLoadingResults = false;
  isRateLimitReached
  resultsLength


  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, public weaknessservice : WeaknessesService){
    this.dataSource = new MatTableDataSource(weaknessData);
    globalWeaknessData.data = this.dataSource.data;

  }
  public openDialog() {
    this.dialog.open(weaknessDialog, {height:'90%', width:"80%",});

  }
  public refresh(){
    this.dataSource.data = globalWeaknessData.data;
  }
  
  ngAfterViewInit(){

    this.dataSource.sort = this.sort;

  }

  ngOnInit(){
    this.weaknesses$ = this.fetchAll()

  }
  fetchAll(): Observable<weaknesses[]> {
    return this.weaknessservice.fetchAll();
  }
  
  post(Nid): void {
    // IdateOfReceipt = new Date();
     console.log("nid : " , Nid)
     this.weaknesses$ = this.weaknessservice
       .post({ Nid})
       .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
   }


}



@Component({
  selector: 'weakness-dialog',
  templateUrl: 'weaknessForm.html',
  styleUrls: ['./weakness-form.component.scss']

})
export class weaknessDialog {
weaknessForm;
position;
id;
desc;
milestones;
submitted= false;
weaknesses$: Observable<weaknesses[]>;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private weaknessservice: WeaknessesService) { }

ngOnInit(){
  this.weaknesses$ = this.fetchAll()
  this.weaknessForm = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public onFormSubmit() {

}
fetchAll(): Observable<weaknesses[]> {
  return this.weaknessservice.fetchAll();
}

post(Nid): void {
  // IdateOfReceipt = new Date();
   console.log("from dialoge weakness : " , Nid)
   this.weaknesses$ = this.weaknessservice
     .post({ Nid})
     .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
 }

public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

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

checkboxLabel(row?: weaknessTable): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


removeSelectedRows() {
  let data = Object.assign(weaknessData)
  this.selection.selected.forEach(item => {
     let index: number = data.findIndex(d => d === item);
     console.log(data.findIndex(d => d === item));
     data.splice(index,1)
     this.dataSource = new MatTableDataSource<weaknessTable>(data);
   });
   this.selection = new SelectionModel<weaknessTable>(true, []);
}
*/