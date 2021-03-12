import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { standards } from '../models/standards';
import { weaknesses } from '../models/weaknesses';
import { ControlsService } from '../services/controls.service';
import { SharedService } from '../services/Shared';
import { StandardsService } from '../services/standards.service';
import { WeaknessesService } from '../services/weaknesses.service';
import { userTable } from '../user-form/user-form.component';





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
  weaknesses$: Observable<weaknesses[]>;

@ViewChild(MatSort) sort;

clickEventsubscription;
displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private sharedService: SharedService, private weaknessService:WeaknessesService) { 
/*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){
  this.weaknesses$ = this.fetchAll();

}
ngAfterViewInit(){

}
fetchAll(): Observable<weaknesses[]> {
  return this.weaknessService.fetchAll();
}

post(inventoryItem: Partial<weaknesses>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;

  this.weaknesses$ = this.weaknessService
    .post({ name })
    .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
}


update(id: number, inventoryItem: Partial<weaknesses>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;

  const newWeakness: weaknesses = {
    id,
    name

  };

  this.weaknesses$ = this.weaknessService
    .update(newWeakness)
    .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.weaknesses$ = this.weaknessService
    .delete(id)
    .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
    
}


}

@Component({
  selector: 'controlTable',
  templateUrl: 'controlTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class controlTable {

controls$: Observable<controls[]>;

@ViewChild(MatSort) sort;

clickEventsubscription;

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private sharedService: SharedService, private controlsService : ControlsService) { 
/*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){
  this.controls$ = this.fetchAll();

}
ngAfterViewInit(){
}

fetchAll(): Observable<controls[]> {
  return this.controlsService.fetchAll();
}

post(inventoryItem: Partial<controls>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;

  this.controls$ = this.controlsService
    .post({ name })
    .pipe(tap(() => (this.controls$ = this.fetchAll())));
}


update(id: number, inventoryItem: Partial<controls>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;

  const newUsers: controls = {
    id,
    name

  };

  this.controls$ = this.controlsService
    .update(newUsers)
    .pipe(tap(() => (this.controls$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.controls$ = this.controlsService
    .delete(id)
    .pipe(tap(() => (this.controls$ = this.fetchAll())));
    
}

}

@Component({
  selector: 'standardTable',
  templateUrl: 'standardTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class standardTable {

@ViewChild(MatSort) sort;
standards$: Observable<standards[]>;

//clickEventsubscription;
//displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private sharedService: SharedService, private standardsService : StandardsService) { 
/*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){
  this.standards$ = this.fetchAll();

}
ngAfterViewInit(){

}
fetchAll(): Observable<standards[]> {
  return this.standardsService.fetchAll();
}

post(inventoryItem: Partial<standards>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;

  this.standards$ = this.standardsService
    .post({ name })
    .pipe(tap(() => (this.standards$ = this.fetchAll())));
}


update(id: number, inventoryItem: Partial<standards>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;

  const newUsers: standards = {
    id,
    name

  };

  this.standards$ = this.standardsService
    .update(newUsers)
    .pipe(tap(() => (this.standards$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.standards$ = this.standardsService
    .delete(id)
    .pipe(tap(() => (this.standards$ = this.fetchAll())));
    
}

}


















/* old standard table functions


isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
applyFilter() {

}


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
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
*/

/* old control table functions

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
applyFilter() {

}


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
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

*/

/* old weakness table functions 


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

*/