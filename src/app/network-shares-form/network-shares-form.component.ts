import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

export interface inventoryTable {
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

const Inv_Data: inventoryTable[] = [
  {position: 1, name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
  department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

  {position:2,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
    department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

    {position: 3,name : "Placeholder" ,employeeNumber : "Placeholder",jobTitle : "Placeholder",jobRole : "Test",employeeType: "Test",
    department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

    {position: 4,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
      department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

      {position: 5,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
      department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

      {position: 6,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
        department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},
];


@Component({
  selector: 'app-network-shares-form',
  templateUrl: './network-shares-form.component.html',
  styleUrls: ['./network-shares-form.component.scss']
})
export class NetworkSharesFormComponent implements OnInit {
  UserForm;
  submitted= false;
    constructor(private http:HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.UserForm = this.formBuilder.group({
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



@Component({
  selector: 'app-network-shares-page',
  templateUrl: './network-shares-page.html',
  styleUrls: ['./network-shares-form.component.scss']
})
export class networkSharesPage implements OnInit {
  submitted = false;
  inventoryForm;
  results;
  panelOpenState;
  rowSelected = false;
 
  dataSource: MatTableDataSource<inventoryTable>;
  selection = new SelectionModel<inventoryTable>(true, []);
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
   'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];



  constructor(private http:HttpClient, private formBuilder: FormBuilder, ) {
    this.dataSource = new MatTableDataSource(Inv_Data);
   }

  ngOnInit(){
    this.inventoryForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    this.http.post(configUrl,this.inventoryForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);
 }

 public onFormReset() {
   this.submitted = false;

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

/** The label for the checkbox on the passed row */
checkboxLabel(row?: inventoryTable): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


removeSelectedRows() {
  let data = Object.assign(Inv_Data)
  this.selection.selected.forEach(item => {
     let index: number = data.findIndex(d => d === item);
     console.log(data.findIndex(d => d === item));
     data.splice(index,1)
     this.dataSource = new MatTableDataSource<inventoryTable>(data);
   });
   this.selection = new SelectionModel<inventoryTable>(true, []);
}
onRowClicked(row): void {
  console.log("Row clicked: ", row);
  this.rowSelected = true;
  var configUrl = 'http://localhost:4200' + "/" + row.Title;
  console.log(configUrl)
 // this.router.navigate(configUrl.concat("/",row.Title))
}

}




