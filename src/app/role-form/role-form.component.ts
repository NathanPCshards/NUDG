import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { SharedService } from './../services/Shared';
import { MatDialog } from '@angular/material/dialog';



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
 
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  rowSelected = false;

  value;
  results;
  panelOpenState = false;

  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];

  dataSource: MatTableDataSource<userTable>;
  selection = new SelectionModel<userTable>(true, []);
  @ViewChild(MatSort) sort;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private sharedService: SharedService) {

    this.dataSource = new MatTableDataSource(Role_Data);

   }

  public openDialog() {
    this.dialog.open(roleDialog, {height:'56%', width:"80%"});
  }

  ngOnInit(){

  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;


  }



 onRowClicked(row): void {
  console.log("Row clicked: ", row);
  this.rowSelected = true;
  var configUrl = 'http://localhost:4200' + "/" + row.Title;
  console.log(configUrl)
 // this.router.navigate(configUrl.concat("/",row.Title))
}
applyFilter(event: Event) {
  //TODO filtering does not apply to groupTable yet. 
  //probably need to make another service event
  this.sharedService.sendFilterEvent(event);

  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  


}

toggleRoles(){
  if (  document.getElementById("roleTable")!.style.display == "table"){
    document.getElementById("roleTable")!.style.display = "none"; 
}
else{
  document.getElementById("roleTable")!.style.display = "table"; 
}

}
toggleGroups(){
  if (  document.getElementById("groupTable")!.style.display == "table"){
      document.getElementById("groupTable")!.style.display = "none"; 
  }
  else{
    document.getElementById("groupTable")!.style.display = "table"; 
  }

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
  //Deletes rows only if table is showing (prevent accidental deletion)
  this.sharedService.sendClickEvent();

  if (document.getElementById("roleTable")!.style.display == "table"){
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


}


@Component({
  selector: 'RoleGroupForms',
  templateUrl: 'dialog1.html',
})
export class roleDialog {
  roleSubmitted = false;
  roleForm;

  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.roleForm = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public onFormSubmit() {
  console.log("FORM WAS SUBMITTED");
  this.roleSubmitted = true;
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

this.roleSubmitted = false;

}


}
