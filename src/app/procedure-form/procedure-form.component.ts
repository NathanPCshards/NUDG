import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { procedures } from '../models/procedures';
import { ProceduresService } from '../services/procedures.service';
import { tap } from 'rxjs/operators';



export interface procedureTable {
  position: number,
  id: string,
  desc: string,
  date: string,
}

class procedure implements procedureTable {
  position: -1;
  id: 'Placeholder';
  desc: 'Placeholder';
  date: 'Placeholder';

  constructor (position, id, desc, date){
    this.position=position;
    this.id = id;
    this.desc = desc;
    this.date = date;
  }
}
const procedureData: procedureTable[] = [
  {position: 1, id: "W1", desc: 'Onboarding and Offboarding process created, written documentation on the handling of added or removed users.', date:'3/4/2020'},
  {position: 2, id: "W2", desc: 'Placeholder', date:'3/4/2020'},

];
let globalProcedureData = new MatTableDataSource(procedureData)


@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.scss']
})
export class ProcedureFormComponent implements OnInit {
  procedures$: Observable<procedures[]>;

  displayedColumns: string[] = ['select', 'id', 'desc', 'date'];
  
  rowSelected = false;
  
    constructor(private http:HttpClient, private formBuilder: FormBuilder,  
      public dialog: MatDialog, private proceduresService : ProceduresService) { 
   
    }
    public openDialog(event) {
      this.dialog.open(procedureDialog, {height:'40%', width:"40%",});
     // event.stopPropagation();  
    }
    public refresh(){
    //  this.dataSource.data = globalProcedureData.data;
    }
  
  ngOnInit(){
    this.procedures$ = this.fetchAll();

  }
  ngAfterViewInit(){
  
  }
  
fetchAll(): Observable<procedures[]> {
  return this.proceduresService.fetchAll();
}

post(inventoryItem: Partial<procedures>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;
/*
  this.procedures$ = this.proceduresService
    .post({ name })
    .pipe(tap(() => (this.procedures$ = this.fetchAll())));*/
}


update(id: number, inventoryItem: Partial<procedures>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;
/*
  const newUsers: procedures = {
    id,
    name

  };

  this.procedures$ = this.proceduresService
    .update(newUsers)
    .pipe(tap(() => (this.procedures$ = this.fetchAll())));*/
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.procedures$ = this.proceduresService
    .delete(id)
    .pipe(tap(() => (this.procedures$ = this.fetchAll())));
    
}

}




@Component({
  selector: 'procedure-dialog',
  templateUrl: 'procedure.html',
  styleUrls: ['./procedure-form.component.scss']

})
export class procedureDialog {
value;
procedureForm;
position;
id;
desc;
date;
milestones;
displayedColumns: String[] = ['select','id', 'desc','date'];


submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.procedureForm = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public procedureSubmit(value) {
  /*
  console.log("procedure submit reached value : " , value)
  if (value =="procedureForm"){
    console.log("procedure WAS SUBMITTED");
    this.submitted = true;
  
    const modal: procedureTable = new procedure(this.position,this.id,this.desc, this.date);
  
  
    const temp = (globalProcedureData.data);
    temp.push(modal)
    globalProcedureData.data = temp;
  }
*/

}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}
}   




/* old table functions

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
    
    checkboxLabel(row?: procedureTable): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    
    
    removeSelectedRows() {
      console.log("delete rows called in group")
        let data = Object.assign(procedureData)
        this.selection.selected.forEach(item => {
           let index: number = data.findIndex(d => d === item);
           console.log(data.findIndex(d => d === item));
           data.splice(index,1)
           this.dataSource = new MatTableDataSource<procedureTable>(data);
         });
         this.selection = new SelectionModel<procedureTable>(true, []);
      
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

*/