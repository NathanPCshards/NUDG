import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { inventories } from '../models/inventory';
import { inventoryService } from '../services/inventory.service';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  submitted = false;
  inventoryForm;
  panelOpenState;
  inventories$: Observable<inventories[]>;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private inventoryService:inventoryService) {
   }

  ngOnInit(){
    this.inventories$ = this.fetchAll();

    this.inventoryForm = this.formBuilder.group({});
  }

  fetchAll(): Observable<inventories[]> {
    return this.inventoryService.fetchAll();
  }

  post(inventoryItem: Partial<inventories>): void {
    const name = (<string>inventoryItem).trim();
    if (!name) return;

    this.inventories$ = this.inventoryService
      .post({ name })
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
  }


  update(id: number, inventoryItem: Partial<inventories>): void {
    const name = (<any>inventoryItem).trim();
    
    if (!name) return;

    const newUsers: inventories = {
      id,
      name

    };

    this.inventories$ = this.inventoryService
      .update(newUsers)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
  }


  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)

    this.inventories$ = this.inventoryService
      .delete(id)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
      
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    //make post here
  
 }

 public onFormReset() {
   this.submitted = false;

}



}





/*


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

checkboxLabel(row?: inventoryTable): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


removeSelectedRows() {
  let data = Object.assign(Inv_Data)
  this.selection.selected.forEach(item => {
     let index: number = data.findIndex(d => d === item);
     console.log(data.findIndex(d => d === item));
     data.splice(index,1)
     this.dataSource = new MatTableDataSource<inventoryTable>(data);
   });
   this.selection = new SelectionModel<inventoryTable>(true, []);
}
onRowClicked(row): void {
  console.log("Row clicked: ", row);
  this.rowSelected = true;
  var configUrl = 'http://localhost:4200' + "/" + row.Title;
  console.log(configUrl)
 // this.router.navigate(configUrl.concat("/",row.Title))
}

*/