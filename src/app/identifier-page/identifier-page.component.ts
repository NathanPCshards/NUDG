import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { SharedService } from '../services/Shared';
import { userTable } from '../user-form/user-form.component';






export interface PeriodicElement {
  position: number;
  Subtitle: string;
  Title: string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, Title: "NIST Mapping", Subtitle: 'Account Management', Status: "Implemented"},
  {position: 2, Title: "AC-N.02", Subtitle: 'Access Enforcement', Status: "Implemented", },
  {position: 3, Title: "AC-N.03", Subtitle: 'Use of External Information Systems', Status: "Implemented"},
  {position: 4, Title: "AC-N.15", Subtitle: 'System Use Notification', Status: "Not Implemented"},
];

export interface tableEntry {
  position: number;
  desc: string;
  id: string;
}

const example_weakness: tableEntry[] = [
  {position: 1, id: "W1", desc: 'Onboarding and Offboarding process created, written documentation on the handling of added or removed users.'},
  {position: 2, id: "W2", desc: 'Placeholder'},
  {position: 3, id: "W3", desc: 'Placeholder'},
];

const example_control: tableEntry[] = [
  {position: 1, id: "C1", desc: 'Users, Groups, and roles documented and assigned'},
  {position: 2, id: "C2", desc: 'Placeholder'},
  {position: 3, id: "C3", desc: 'Placeholder'},
  {position: 3, id: "C4", desc: 'Placeholder'},

];

const example_standard: tableEntry[] = [
  {position: 1, id: "S1", desc: 'Define and document the types of accounts authorized to access resources'},
  {position: 2, id: "S2", desc: 'Placeholder'},
  {position: 3, id: "S3", desc: 'Placeholder'},
  {position: 4, id: "S4", desc: 'Placeholder'},
  {position: 5, id: "S5", desc: 'Placeholder'},
];






@Component({
  selector: 'app-identifier-page',
  templateUrl: './identifier-page.component.html',
  styleUrls: ['./identifier-page.component.scss']
})
export class IdentifierPageComponent implements OnInit {
  submitted = false;
  idPage;
  results;
  panelOpenState;
  displayedColumns: string[] = ['Title', 'Subtitle', 'Status'];
  dataSource = ELEMENT_DATA;
  rowSelected = false;
  name: any;


  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.idPage = this.formBuilder.group({
      //initialize some stuff here
    });
  }


  onRowClicked(row): void {
    console.log("Row clicked: ", row);
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
    console.log(configUrl)
   // this.router.navigate(configUrl.concat("/",row.Title))
  }




}



//weaknesses
//controls
//standards


@Component({
  selector: 'weaknessTable',
  templateUrl: 'weaknessTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class weaknessTable {
dataSource: MatTableDataSource<tableEntry>;
selection = new SelectionModel<tableEntry>(true, []);
@ViewChild(MatSort) sort;

clickEventsubscription;
displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private sharedService: SharedService) { 
    this.dataSource = new MatTableDataSource(example_weakness);

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
    if (document.getElementById("groupTable")!.style.display == "table"){
      let data = Object.assign(ELEMENT_DATA)
      this.selection.selected.forEach(item => {
         let index: number = data.findIndex(d => d === item);
         console.log(data.findIndex(d => d === item));
         data.splice(index,1)
         this.dataSource = new MatTableDataSource<tableEntry>(data);
       });
       this.selection = new SelectionModel<tableEntry>(true, []);
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

@Component({
  selector: 'controlTable',
  templateUrl: 'controlTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class controlTable {
dataSource: MatTableDataSource<tableEntry>;
selection = new SelectionModel<tableEntry>(true, []);
@ViewChild(MatSort) sort;

clickEventsubscription;
displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private sharedService: SharedService) { 
    this.dataSource = new MatTableDataSource(example_control);

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
    if (document.getElementById("groupTable")!.style.display == "table"){
      let data = Object.assign(ELEMENT_DATA)
      this.selection.selected.forEach(item => {
         let index: number = data.findIndex(d => d === item);
         console.log(data.findIndex(d => d === item));
         data.splice(index,1)
         this.dataSource = new MatTableDataSource<tableEntry>(data);
       });
       this.selection = new SelectionModel<tableEntry>(true, []);
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

@Component({
  selector: 'standardTable',
  templateUrl: 'standardTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class standardTable {
dataSource: MatTableDataSource<tableEntry>;
selection = new SelectionModel<tableEntry>(true, []);
@ViewChild(MatSort) sort;

clickEventsubscription;
displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private sharedService: SharedService) { 
    this.dataSource = new MatTableDataSource(example_standard);

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
    if (document.getElementById("groupTable")!.style.display == "table"){
      let data = Object.assign(ELEMENT_DATA)
      this.selection.selected.forEach(item => {
         let index: number = data.findIndex(d => d === item);
         console.log(data.findIndex(d => d === item));
         data.splice(index,1)
         this.dataSource = new MatTableDataSource<tableEntry>(data);
       });
       this.selection = new SelectionModel<tableEntry>(true, []);
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



