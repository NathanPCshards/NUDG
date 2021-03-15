import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cuicontracts } from '../models/cuicontracts';
import { CuicontractsService } from '../services/cuicontracts.service';


@Component({
  selector: 'app-cui-contracts-form',
  templateUrl: './cui-contracts-form.component.html',
  styleUrls: ['./cui-contracts-form.component.scss']
})
export class CuiContractsFormComponent implements OnInit {

  picker;
  cuicontracts$: Observable<cuicontracts[]>;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
   'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];
  rowSelected = false;
  name: any;
 



  constructor(private http: HttpClient, private formBuilder: FormBuilder,
     public dialog: MatDialog, private cuicontractsService : CuicontractsService){
    
  }
  
  public openDialog() {
    this.dialog.open(DialogCUIForm, {height:'65%', width:"80%",});

  }

  ngAfterViewInit(){

  }

  ngOnInit(){
    this.cuicontracts$ = this.fetchAll();

  }

  fetchAll(): Observable<cuicontracts[]> {
    return this.cuicontractsService.fetchAll();

  }
  
  post(inventoryItem: Partial<cuicontracts>): void {
    const name = (<string>inventoryItem).trim();
    if (!name) return;
  
    /*
    this.cuicontracts$ = this.cuicontractsService
      .post({ name })
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));*/
  }
  
  
  update(id: number, inventoryItem: Partial<cuicontracts>): void {
    const name = (<any>inventoryItem).trim();
    
    if (!name) return;
  /*
    const newUsers: cuicontracts = {
      id,
      name
  
    };
  
    this.cuicontracts$ = this.cuicontractsService
      .update(newUsers)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));*/
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.cuicontracts$ = this.cuicontractsService
      .delete(id)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
      
  }

}


@Component({
  selector: 'cuiForm',
  templateUrl: './cuiForm.html',
  styleUrls: ['./cui-contracts-form.component.scss']

})
export class DialogCUIForm {
cuiForm;
submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){

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




/* old table functions

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