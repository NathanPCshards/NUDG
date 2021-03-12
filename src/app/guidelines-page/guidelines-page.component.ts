import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { guidelines } from '../models/guidelines';
import { GuidelinesService } from '../services/guidelines.service';



@Component({
  selector: 'guidelines-form',
  templateUrl: 'guidelinesForm.html',
  styleUrls: ['./guidelines-page.component.scss']
})
export class GuidelinesPageComponent implements OnInit {
  guidelineForm;
  id;
  desc;

  
  
  submitted= false;
    constructor(private http:HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.guidelineForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
  
    });
  }
  public submit() {
    console.log("form submitted")

  
  }
  
  
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }
} 



@Component({
  selector: 'app-guidelines-page',
  templateUrl: './guidelines-page.component.html',
  styleUrls: ['./guidelines-page.component.scss']
})
export class GuidelinesForm implements OnInit {
  panelOpenState = false;
  rowSelected;

  guidelines$: Observable<guidelines[]>;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private guidelinesService : GuidelinesService ) {
   }

  ngOnInit(){
    this.guidelines$ = this.fetchAll();

  }
  fetchAll(): Observable<guidelines[]> {
    return this.guidelinesService.fetchAll();
  }
  
  post(inventoryItem: Partial<guidelines>): void {
    const name = (<string>inventoryItem).trim();
    if (!name) return;
  
    this.guidelines$ = this.guidelinesService
      .post({ name })
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
  }
  
  
  update(id: number, inventoryItem: Partial<guidelines>): void {
    const name = (<any>inventoryItem).trim();
    
    if (!name) return;
  
    const newUsers: guidelines = {
      id,
      name
  
    };
  
    this.guidelines$ = this.guidelinesService
      .update(newUsers)
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.guidelines$ = this.guidelinesService
      .delete(id)
      .pipe(tap(() => (this.guidelines$ = this.fetchAll())));
      
  }
  
  public onFormSubmit() {


}
}
  



/*  old guidelines page


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

checkboxLabel(row?: entry): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


removeSelectedRows() {
  let data = Object.assign(exampleData)
  this.selection.selected.forEach(item => {
     let index: number = data.findIndex(d => d === item);
     console.log(data.findIndex(d => d === item));
     data.splice(index,1)
     this.dataSource = new MatTableDataSource<entry>(data);
   });
   this.selection = new SelectionModel<entry>(true, []);
}
onRowClicked(row): void {
  console.log("Row clicked: ", row);
  this.rowSelected = true;
  var configUrl = 'http://localhost:4200' + "/" + row.Title;
  console.log(configUrl)
 // this.router.navigate(configUrl.concat("/",row.Title))
}


*/