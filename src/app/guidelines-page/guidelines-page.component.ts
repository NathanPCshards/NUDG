import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

export interface entry {
id: string,
desc: string,
position: number


}

const exampleData: entry[] = [
  {position: 1, id: "first", desc: "Dont share your password"},
  {position: 2, id: "second", desc: "Dont share your username"},
  {position: 3, id: "third", desc: "Just dont use computers in general."},



];

@Component({
  selector: 'guidelines-form',
  templateUrl: 'guidelinesForm.html',
  styleUrls: ['./guidelines-page.component.scss']
})
export class GuidelinesPageComponent implements OnInit {
  guidelineForm;
  id;
  desc;

  displayedColumns: String[] = ['select','id', 'desc'];
  
  
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
  dataSource: MatTableDataSource<entry>;
  selection = new SelectionModel<entry>(true, []);
  displayedColumns: string[] = ['id', 'desc'];
  panelOpenState = false;
  rowSelected;



  constructor(private http:HttpClient, private formBuilder: FormBuilder, ) {
    this.dataSource = new MatTableDataSource(exampleData);
   }

  ngOnInit(){

  }

  public onFormSubmit() {


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

/** The label for the checkbox on the passed row */
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
}
  

