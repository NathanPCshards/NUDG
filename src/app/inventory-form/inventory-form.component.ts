import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  


  constructor(private http:HttpClient, private fb: FormBuilder, private inventoryService:inventoryService) {
    this.inventoryForm = this.fb.group({
      idOrgInventory : ['number'],
      IassetIdentifier : [''],
      Iaddress : ['addr'],
      InetworkID : ['test'],
      Ivirtual : [''],
      Ipublic : [''],
      Idnsname : [''],
      InetbiosName : [''],
      Imacaddress : [''],
      IauthenticatedScan : [''],
      IosNameAndVersion : [''],
      IphysicalLocation :[''],
      IhardwareSoftwareVendor :[''],
      IdateOfReceipt : ['DATE'],
      Icost : [''],
      IsoftwareDatabase : [''],
      Ipatchlevel : [''],
      Ifunction : [''],
      Icomments : [''],
      Iserial: [''],
      Ivlan : [''],
      IsystemAdmin : [''],
      Iapplication : [''],
      IsoftwareApproval : [''],

    });
  }

  ngOnInit(){
    this.inventories$ = this.fetchAll();
  }

  fetchAll(): Observable<inventories[]> {
    return this.inventoryService.fetchAll();
  }

  post(inventoryItem: Partial<inventories>): void {
    const idOrgInventory = (<number>inventoryItem);
    if (!idOrgInventory) return;

    var formData: any = new FormData();
    formData.append("IassetIdentifier", this.inventoryForm.get('IassetIdentifier').value);
    formData.append("Iaddress", this.inventoryForm.get('Iaddress').value);

    console.log("form data in inventory : " , formData.get("IassetIdentifier"))

    this.inventories$ = this.inventoryService
      .post({ formData })
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
  }


  update(id: number, inventoryItem: Partial<inventories>): void {
    const name = (<any>inventoryItem).trim();
    
    if (!name) return;
    /*
    const newUsers: inventories = {
      id,
      name

    };

    this.inventories$ = this.inventoryService
      .update(newUsers)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));*/
  }


  delete(id: any): void {
    console.log("attempting to delete id : " , id)

    this.inventories$ = this.inventoryService
      .delete(id)
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));
      
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 

   // const formData:Partial<inventories>[] = [{idOrgInventory: 1}];
/*
    this.inventories$ = this.inventoryService
      .post({ formData })
      .pipe(tap(() => (this.inventories$ = this.fetchAll())));*/
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