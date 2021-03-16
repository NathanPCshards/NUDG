import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { vendors } from '../models/vendors';
import { VendorsService } from '../services/vendors.service';
import { DialogSupplier } from '../supplier-form/supplier-form.component';




@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  picker;

  submitted = false;
  results;// = res.json();
  panelOpenState = false;

  name: any;
  vendors$: Observable<vendors[]>;


  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    public dialog: MatDialog, private vendorsService : VendorsService){
    
  }
  public openDialog() {
    this.dialog.open(DialogVendor, {height:'75%', width:"80%",});

  }

  ngAfterViewInit(){

  }

  ngOnInit(){
    this.vendors$ = this.fetchAll();

  }

  fetchAll(): Observable<vendors[]> {
    return this.vendorsService.fetchAll();
  }
  
  post(inventoryItem: Partial<vendors>): void {
    const name = (<string>inventoryItem).trim();
    if (!name) return;
  /*
    this.vendors$ = this.vendorsService
      .post({ name })
      .pipe(tap(() => (this.vendors$ = this.fetchAll())));
      */
  }
  
  
  update(id: number, inventoryItem: Partial<vendors>): void {
    const name = (<any>inventoryItem).trim();
    
    if (!name) return;
  /*
    const newUsers: vendors = {
      id,
      name
  
    };
  
    this.vendors$ = this.vendorsService
      .update(newUsers)
      .pipe(tap(() => (this.vendors$ = this.fetchAll())));*/
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.vendors$ = this.vendorsService
      .delete(id)
      .pipe(tap(() => (this.vendors$ = this.fetchAll())));
      
  }
  
  

}
@Component({
  selector: 'vendorForm',
  templateUrl: 'vendorForm.html',
})
export class DialogVendor {
  vendorform;
  submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.vendorform = this.formBuilder.group({
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