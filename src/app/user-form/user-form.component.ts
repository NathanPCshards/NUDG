import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../services/user-service.service';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { MatPaginator } from '@angular/material/paginator';


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
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
 // exampleDatabase: ExampleHttpDatabase | null;
  //filteredAndPagedIssues: Observable<GithubIssue[]>;
  users$: Observable<Users[]>;
  submitted= false;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  UserForm;
  panelOpenState =false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  displayedColumns: string[] = ['idusersu','uname']


 


  constructor(private _httpClient: HttpClient, private formBuilder: FormBuilder, 
              public dialog: MatDialog, private userService: UserServiceService,){  }
 



  ngOnInit(){
    this.users$ = this.fetchAll();
    console.log("trace1");
   
  }
  ngAfterViewInit(){
  //  this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  fetchAll(): Observable<Users[]> {
    return this.userService.fetchAll();
  }

  post(userItem: Partial<Users>): void {
    const Uuserid = (<string>userItem).trim();
    if (!Uuserid) return;

    this.users$ = this.userService
      .post({ Uuserid })
      .pipe(tap(() => (this.users$ = this.fetchAll())));
  }


  update(idusersu: number, userItem: Partial<Users>): void {
    const uname = (<any>userItem).trim();
    
    if (!uname) return;
/*
    const newUsers: Users = {
      idusersu,
      uname

    };

    this.users$ = this.userService
      .update(newUsers)
      .pipe(tap(() => (this.users$ = this.fetchAll())));*/
  }


  delete(Uuserid: any): void {
    console.log("attempting to delete id : " , Uuserid)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)

    this.users$ = this.userService
      .delete(Uuserid)
      .pipe(tap(() => (this.users$ = this.fetchAll())));
      
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


/* functions from old table

 panelOpenState = false;
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
   'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];




 public openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {height:'65%', width:"80%",});

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