import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
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

const Role_Data: userTable[] = [
  {position: 1, name : "Role" ,employeeNumber : "Test",jobTitle : "Role",jobRole : "Test",employeeType: "Test",
  department: "Test", hireDate: "Role",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

  {position:2,name : "Test" ,employeeNumber : "Role",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
    department: "Test", hireDate: "Test",logonHours: "Role",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

    {position: 3,name : "Binno" ,employeeNumber : "is",jobTitle : "gay",jobRole : "Test",employeeType: "Test",
    department: "Role", hireDate: "Role",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},
];

const Group_Data: userTable[] = [
  
  {position: 4,name : "Test" ,employeeNumber : "Test",jobTitle : "GROUP",jobRole : "GROUP",employeeType: "Test",
  department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

  {position: 5,name : "GROUP" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
  department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "GROUP", phone: "Test", address: "Test", CUIdata: "Test",},

  {position: 6,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
    department: "GROUP", hireDate: "GROUP",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",}
]

//TODO take all the shit required for the group table and move it to
//the groupform ts file. maybe make a html file for just the table
//and import it to role form? assuming we want both tables on 1 page.

//also finish setting up the dialog thing



 
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  rowSelected = false;
  roleSubmitted = false;
  roleForm;
  value;
  results;
  panelOpenState = false;
  openDialog;
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];

  dataSource: MatTableDataSource<userTable>;
  dataSourceGroup: MatTableDataSource<userTable>;

  selection = new SelectionModel<userTable>(true, []);
  @ViewChild(MatSort) sort;


  constructor(private http:HttpClient, private formBuilder: FormBuilder) {
    this.dataSourceGroup = new MatTableDataSource(Group_Data);

    this.dataSource = new MatTableDataSource(Role_Data);

   }

  ngOnInit(){
    this.roleForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSourceGroup.sort = this.sort;

  }



  public onFormSubmit(value) {
    this.value = value;
    if (value == "roleForm"){

      console.log("Role form submitted, value: " + value);
      this.roleSubmitted = true;
      const configUrl = 'http://localhost:4200/home'; 
      this.http.post(configUrl,this.roleForm.value)
      .pipe(
        tap(
          data => console.log(configUrl, data),
          error => console.log(configUrl, error)
        )
      )
      .subscribe(results => this.results = results);

    }

   

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

viewRoles(){
  console.log("Roles should be visible")
  document.getElementById("roleTable")!.style.visibility = "visible"; 
  document.getElementById("groupTable")!.style.visibility = "hidden"; 

}
viewGroups(){
  console.log("Groups should be visible")
  document.getElementById("roleTable")!.style.visibility = "hidden"; 
  document.getElementById("groupTable")!.style.visibility = "visible"; 

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
  let data = Object.assign(Role_Data)
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
  selector: 'RoleGroupForms',
  templateUrl: 'dialog1.html',
})
export class roleDialog {
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
