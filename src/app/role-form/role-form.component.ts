import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { SharedService } from './../services/Shared';
import { MatDialog } from '@angular/material/dialog';
import { roles } from '../models/roles';
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';

 
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  rowSelected = false;
  roles$: Observable<roles[]>;
  value;
  results;
  panelOpenState = false;

  //displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  //'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];

  @ViewChild(MatSort) sort;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private sharedService: SharedService,
    private roleservice: RolesService) {


   }

  public openDialog() {
    this.dialog.open(roleDialog, {height:'56%', width:"80%"});
  }

  ngOnInit(){
    this.roles$ = this.fetchAll();

  }
  ngAfterViewInit(){


  }


  fetchAll(): Observable<roles[]> {
    return this.roleservice.fetchAll();
  }

  post(userItem: Partial<roles>): void {
    const name = (<string>userItem).trim();
    if (!name) return;
/*
    this.roles$ = this.roleservice
      .post({ name })
      .pipe(tap(() => (this.roles$ = this.fetchAll())));*/
  }


  update(id: number, userItem: Partial<roles>): void {
    const name = (<any>userItem).trim();
    
    if (!name) return;
/*
    const newroles: roles = {
      id,
      name

    };

    this.roles$ = this.roleservice
      .update(newroles)
      .pipe(tap(() => (this.roles$ = this.fetchAll())));*/
  }


  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)

    this.roles$ = this.roleservice
      .delete(id)
      .pipe(tap(() => (this.roles$ = this.fetchAll())));
      
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


/*


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



*/