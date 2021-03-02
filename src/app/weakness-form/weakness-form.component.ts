import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { SharedService } from '../services/Shared';


//import { actorTable } from '../models/sequelize.model.js' 


import { tableEntry } from '../identifier-page/identifier-page.component';

const example_weakness: tableEntry[] = [
  {position: 1, id: "W1", desc: 'Onboarding and Offboarding process created, written documentation on the handling of added or removed users test test test test test test test test .'},
  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},
  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},
  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},
  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},
  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},

  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},
];

// tableEntry ---> TableTest

//exampleWeakness ???

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



@Component({
  selector: 'app-weakness-form',
  templateUrl: './weakness-form.component.html',
  styleUrls: ['./weakness-form.component.scss']
})
export class WeaknessFormComponent /*implements OnInit*/ {


  /*
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;
  displayedColumns: String[] = ['actor_id', 'first_name', 'last_name'];
  rowSelected = false;
  name: any;
 
  dataSource: MatTableDataSource<actorTable>;
  selection = new SelectionModel<actorTable>(true, []);
  @ViewChild(MatSort) sort;


  //Database variables
  isLoadingResults = false;
 exampleDatabase: actorTable;
  isRateLimitReached
  resultsLength
*/

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, public _sharedService : SharedService){
    console.log('constructing');
    
  }
/*
  

  public openDialog() {
    this.dialog.open(weaknessDialog, {height:'90%', width:"80%",});

  }
  
  public getTableEntries = () => {
    
    this._sharedService.getAll().subscribe(res => {
      this.dataSource.data = res as actorTable[],
      console.log(res),
      response => console.log('Success!',response),
              error => console.error('Error!',error);
              console.log(this.dataSource.data);  
              
                
    })
  }

/*
getTableEntries(){
  this._sharedService.getAll()
  .subscribe( )
}

  ngAfterViewInit(){
  console.log('intilazing');
    
  //  this.dataSource.sort = this.sort;

    

 //   this.dataSource = new actorTable(this.sort)
 // this.exampleDatabase = new actorTable(this.http);


  }
*/
  ngOnInit(){
    this._sharedService.sendMessage("Hello IO  - sent from weakness form")
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

checkboxLabel(row?: userTable): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


removeSelectedRows() {
  let data = Object.assign(User_Data)
  this.selection.selected.forEach(item => {
     let index: number = data.findIndex(d => d === item);
     console.log(data.findIndex(d => d === item));
     data.splice(index,1)
     this.dataSource = new MatTableDataSource<userTable>(data);
   });
   this.selection = new SelectionModel<userTable>(true, []);
}
*/
}


@Component({
  selector: 'milestoneForm',
  templateUrl: 'milestoneForm.html',
  styleUrls: ['./weakness-form.component.scss']

})
export class milestoneForm {
  dataSource: MatTableDataSource<tableEntry>;
  selection = new SelectionModel<tableEntry>(true, []);
  @ViewChild(MatSort) sort;
  
  clickEventsubscription;
  displayedColumns: string[] = ['id', 'desc'];
  
  rowSelected = false;
  
    constructor(private http:HttpClient, private formBuilder: FormBuilder) { 
      this.dataSource = new MatTableDataSource(example_weakness);

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
    checkboxLabel(row?: tableEntry): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    
    
    removeSelectedRows() {
      console.log("delete rows called in group")
        let data = Object.assign(example_weakness)
        this.selection.selected.forEach(item => {
           let index: number = data.findIndex(d => d === item);
           console.log(data.findIndex(d => d === item));
           data.splice(index,1)
           this.dataSource = new MatTableDataSource<tableEntry>(data);
         });
         this.selection = new SelectionModel<tableEntry>(true, []);
      
    }
    onRowClicked(row): void {
      console.log("Row clicked: ", row);
      this.rowSelected = true;
      var configUrl = 'http://localhost:4200' + "/" + row.Title;
      console.log(configUrl)
     // this.router.navigate(configUrl.concat("/",row.Title))
    }
}

@Component({
  selector: 'weakness-dialog',
  templateUrl: 'weaknessForm.html',
  styleUrls: ['./weakness-form.component.scss']

})
export class weaknessDialog {
weaknessForm;
submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.weaknessForm = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public onFormSubmit() {
  console.log("FORM WAS SUBMITTED");
  this.submitted = true;
  const configUrl = 'http://localhost:4200/home'; 
  /*
  this.http.post(configUrl,this.UserForm.value)
  .pipe(
    tap(
      data => console.log(configUrl, data),
      error => console.log(configUrl, error)
    )
  )
  .subscribe(results => this.results = results);*/
}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}
}   



















// If the user changes the sort order, reset back to the first page.
//this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
/*
merge(this.sort.sortChange)
  .pipe(
    startWith({}),
    switchMap(() => {
      this.isLoadingResults = true;
      return this.exampleDatabase!.getRepoIssues(
        this.sort.active, this.sort.direction);
    }),
    map(data => {
      // Flip flag to show that loading has finished.
      this.isLoadingResults = false;
      this.isRateLimitReached = false;
      this.resultsLength = data.total_count;

      return data.items;
    }),
    catchError(() => {
      this.isLoadingResults = false;
      // Catch if the GitHub API has reached its rate limit. Return empty data.
      this.isRateLimitReached = true;
      return observableOf([]);
    })
  ).subscribe(data => this.data = data);*/