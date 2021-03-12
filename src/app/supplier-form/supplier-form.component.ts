import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { suppliers } from '../models/suppliers';
import { SuppliersService } from '../services/suppliers.service';



@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;

  name: any;
  suppliers$: Observable<suppliers[]>;



  constructor(private http: HttpClient, private formBuilder: FormBuilder,
     public dialog: MatDialog, public suppliersService : SuppliersService){
    
  }
  public openDialog() {
    this.dialog.open(DialogSupplier, {height:'75%', width:"75%",});

  }



  ngOnInit(){
    this.suppliers$ = this.fetchAll();

  }

  fetchAll(): Observable<suppliers[]> {
    return this.suppliersService.fetchAll();
  }
  
  post(inventoryItem: Partial<suppliers>): void {
    const name = (<string>inventoryItem).trim();
    if (!name) return;
  
    this.suppliers$ = this.suppliersService
      .post({ name })
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
  }
  
  
  update(id: number, inventoryItem: Partial<suppliers>): void {
    const name = (<any>inventoryItem).trim();
    
    if (!name) return;
  
    const newUsers: suppliers = {
      id,
      name
  
    };
  
    this.suppliers$ = this.suppliersService
      .update(newUsers)
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.suppliers$ = this.suppliersService
      .delete(id)
      .pipe(tap(() => (this.suppliers$ = this.fetchAll())));
      
  }
  
}






@Component({
  selector: 'supplierForm',
  templateUrl: 'supplierForm.html',
})
export class DialogSupplier {
supplierform;
submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.supplierform = this.formBuilder.group({
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


/* old functions for table

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