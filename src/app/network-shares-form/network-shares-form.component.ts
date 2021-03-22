import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { networkshares } from '../models/networkshares';
import { NetworksharesService } from '../services/networkshares.service';

@Component({
  selector: 'app-network-shares-page',
  templateUrl: './network-shares-page.html',
  styleUrls: ['./network-shares-form.component.scss']
})
export class networkSharesPage implements OnInit {
  submitted = false;
  inventoryForm;
  results;
  panelOpenState;
  rowSelected = false;

  networkshares$: Observable<networkshares[]>;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private networksharesService : NetworksharesService ) {
   }

  ngOnInit(){
    this.networkshares$ = this.fetchAll();

    this.inventoryForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    this.http.post(configUrl,this.inventoryForm)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);
 }

 public onFormReset() {
   this.submitted = false;

}



fetchAll(): Observable<networkshares[]> {
  return this.networksharesService.fetchAll();
}

post(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata ,GRA, GWA, URA, UWA): void {

  this.networkshares$ = this.networksharesService
    .post({NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA})
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
}


update(NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares): void {


  this.networkshares$ = this.networksharesService
    .update({NSshareName, NSresourceType, NSdescription, NSfolderPath, NShostIdentifier,CUIdata, GRA, GWA, URA, UWA, idOrgNetworkShares})
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)

  this.networkshares$ = this.networksharesService
    .delete(id)
    .pipe(tap(() => (this.networkshares$ = this.fetchAll())));
    
}




}





/*old table functions

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