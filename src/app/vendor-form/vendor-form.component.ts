import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSupplier } from '../supplier-form/supplier-form.component';





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
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
   'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];
  rowSelected = false;
  name: any;
 
  dataSource: MatTableDataSource<userTable>;
  selection = new SelectionModel<userTable>(true, []);
  @ViewChild(MatSort) sort;


  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog){
    this.dataSource = new MatTableDataSource(User_Data);
    
  }
  public openDialog() {
    this.dialog.open(DialogVendor, {height:'75%', width:"80%",});

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












}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'vendorForm.html',
})
export class DialogVendor {
  vendorform;
  submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.vendorform = this.formBuilder.group({
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