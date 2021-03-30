import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  cuicontracts$: Observable<cuicontracts[]>;

  panelOpenState = false;



  constructor(public dialog: MatDialog, private cuicontractsService : CuicontractsService){
    
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

}
