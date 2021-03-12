import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { groups } from '../models/groups';
import { inventories } from '../models/inventory';
import { GroupsService } from '../services/groups.service';
import { SharedService } from '../services/Shared';




@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  groupSubmitted = false;
  groupForm;
  results;
  value;



  constructor(private http:HttpClient, private formBuilder: FormBuilder) { 

  }

  ngOnInit(){
    this.groupForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  
  public onFormSubmit(value) {
    this.value = value;
    if (value == "groupForm"){

      console.log("Group form submitted, value: " + value)
      this.groupSubmitted = true;
      const configUrl = 'http://localhost:4200/home'; 
      this.http.post(configUrl,this.groupForm.value)
      .pipe(
        tap(
          data => console.log(configUrl, data),
          error => console.log(configUrl, error)
        )
      )
      .subscribe(results => this.results = results);

    }

 }

 public onFormReset(value) {
   console.log("group form reset. value  " + value);
   console.log(value == "groupForm");
  if (value == "groupForm"){
    this.groupSubmitted = false;
  }

}
  
}
  

@Component({
  selector: 'groupTable',
  templateUrl: 'groupTable.html',
  styleUrls: ['./group-form.component.scss']

})
export class groupTable {
submitted = false;
inventoryForm;
panelOpenState;
groups$: Observable<groups[]>;

clickEventsubscription;

displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];
rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder,
     private sharedService: SharedService, private groupsService : GroupsService) { 

      /*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){

}
ngAfterViewInit(){
  this.groups$ = this.fetchAll();

}
fetchAll(): Observable<inventories[]> {
  return this.groupsService.fetchAll();
}

post(inventoryItem: Partial<inventories>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;

  this.groups$ = this.groupsService
    .post({ name })
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
}


update(id: number, inventoryItem: Partial<inventories>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;

  const newUsers: inventories = {
    id,
    name

  };

  this.groups$ = this.groupsService
    .update(newUsers)
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.groups$ = this.groupsService
    .delete(id)
    .pipe(tap(() => (this.groups$ = this.fetchAll())));
    
}

}



/*  Old group table functions

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
applyFilter() {
  //TODO filtering does not apply to groupTable yet. 
  //probably need to make another service event
  // -- or a injectable?

  
  this.sharedService.filterSubject.subscribe({
    next: (v) => console.log(v)
  });




  //const filterValue = (event.target as HTMLInputElement).value;
 // this.dataSource.filter = filterValue.trim().toLowerCase()7;


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
  console.log("delete rows called in group")
  if (document.getElementById("groupTable")!.style.display == "table"){
    let data = Object.assign(Group_Data)
    this.selection.selected.forEach(item => {
       let index: number = data.findIndex(d => d === item);
       console.log(data.findIndex(d => d === item));
       data.splice(index,1)
       this.dataSource = new MatTableDataSource<userTable>(data);
     });
     this.selection = new SelectionModel<userTable>(true, []);
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