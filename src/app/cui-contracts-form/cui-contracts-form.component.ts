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
  


  ngAfterViewInit(){

  }

  ngOnInit(){
    this.cuicontracts$ = this.fetchAll();

  }

  fetchAll(): Observable<cuicontracts[]> {
    return this.cuicontractsService.fetchAll();

  }
  
  post(CCname, CCnum, CCstartDate, CCendDate, CCdescription): void {


    this.cuicontracts$ = this.cuicontractsService
      .post({ CCname, CCnum, CCstartDate, CCendDate, CCdescription })
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
  
  
  }
  update(CCname, CCnum, CCstartDate, CCendDate, CCdescription, idCUIcontracts ): void {


    this.cuicontracts$ = this.cuicontractsService
      .update({CCname, CCnum, CCstartDate, CCendDate, CCdescription, idCUIcontracts} )
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
  }
  
  
  delete(id: any): void {
    console.log("attempting to delete id : " , id)
   // iduseru = 15
   // console.log("attempting to delete id : " , iduseru)
  
    this.cuicontracts$ = this.cuicontractsService
      .delete(id)
      .pipe(tap(() => (this.cuicontracts$ = this.fetchAll())));
      
  }
  public onFormSubmit() {

    this.submitted = true;
  
  }
  
  
  public onFormReset() {
  
  this.submitted = false;
  
  }

}
