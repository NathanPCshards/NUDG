import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { SharedService } from '../services/Shared';


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




const Group_Data: userTable[] = [
  
  {position: 4,name : "Test" ,employeeNumber : "Test",jobTitle : "GROUP",jobRole : "GROUP",employeeType: "Test",
  department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",},

  {position: 5,name : "GROUP" ,employeeNumber : "monkey",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
  department: "Test", hireDate: "Test",logonHours: "Test",emailAddress: "GROUP", phone: "Test", address: "Test", CUIdata: "Test",},

  {position: 6,name : "Test" ,employeeNumber : "Test",jobTitle : "Test",jobRole : "Test",employeeType: "Test",
    department: "GROUP", hireDate: "GROUP",logonHours: "Test",emailAddress: "Test", phone: "Test", address: "Test", CUIdata: "Test",}
]


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  groupSubmitted = false;
  groupForm;
  results;
  value;
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];




  constructor(private http:HttpClient, private formBuilder: FormBuilder) { 

  }

  ngOnInit(){
    this.groupForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  
  public onFormSubmit(value) {
    this.value = value;
    if (value == "groupForm"){

      console.log("Group form submitted, value: " + value)
      this.groupSubmitted = true;
      const configUrl = 'http://localhost:4200/home'; 
      this.http.post(configUrl,this.groupForm.value)
      .pipe(
        tap(
          data => console.log(configUrl, data),
          error => console.log(configUrl, error)
        )
      )
      .subscribe(results => this.results = results);

    }

 }

 public onFormReset(value) {
   console.log("group form reset. value  " + value);
   console.log(value == "groupForm");
  if (value == "groupForm"){
    this.groupSubmitted = false;
  }

}
  
}
  

@Component({
  selector: 'groupTable',
  templateUrl: 'groupTable.html',
})
export class groupTable {
dataSource: MatTableDataSource<userTable>;
selection = new SelectionModel<userTable>(true, []);
@ViewChild(MatSort) sort;

clickEventsubscription;

displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];
rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private sharedService: SharedService) { 
    this.dataSource = new MatTableDataSource(Group_Data);

    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })

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
applyFilter() {
  //TODO filtering does not apply to groupTable yet. 
  //probably need to make another service event
  // -- or a injectable?

  /*
  this.sharedService.filterSubject.subscribe({
    next: (v) => console.log(v)
  });
*/



  //const filterValue = (event.target as HTMLInputElement).value;
 // this.dataSource.filter = filterValue.trim().toLowerCase()7;


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
    console.log("delete rows called in group")
    if (document.getElementById("groupTable")!.style.display == "table"){
      let data = Object.assign(Group_Data)
      this.selection.selected.forEach(item => {
         let index: number = data.findIndex(d => d === item);
         console.log(data.findIndex(d => d === item));
         data.splice(index,1)
         this.dataSource = new MatTableDataSource<userTable>(data);
       });
       this.selection = new SelectionModel<userTable>(true, []);
    }
  }
  onRowClicked(row): void {
    console.log("Row clicked: ", row);
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
    console.log(configUrl)
   // this.router.navigate(configUrl.concat("/",row.Title))
  }

}