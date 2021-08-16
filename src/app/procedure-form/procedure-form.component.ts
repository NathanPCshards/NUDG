import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { procedures } from '../models/procedures';
import { ProceduresService } from '../services/procedures.service';
import { tap } from 'rxjs/operators';
import { restAPI } from '../services/restAPI.service';
import { login } from '../injectables';




@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.scss']
})
export class ProcedureFormComponent implements OnInit {
  procedures$: Observable<procedures[]>;
  procedureList;
  idOrgControls;
  rowSelected = false;
  searchProcedures
  

    constructor(
      private http:HttpClient, 
      private formBuilder: FormBuilder,  
      public dialog: MatDialog, 
      private procedureService : ProceduresService,
      private dialogRef : MatDialogRef<ProcedureFormComponent>, 
      private rest_service : restAPI,
      private loginInfo : login,
      @Inject(MAT_DIALOG_DATA) public data : any) { 
        this.idOrgControls = data.idOrgControls;

    }

    public openDialog(event) {
      let dialogRef = this.dialog.open(procedureDialog, {
        width: '1200px',
        height: '550px',
        minHeight: '550px',
        autoFocus : false,


        data: {
          idOrgControls:this.idOrgControls
        },
  
      });
      this.procedureList = []
      dialogRef.afterClosed().subscribe(result => {
        /*
        if (result){

          this.procedures$ = this.rest_service
          .post(`http://192.168.0.70:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`,result)
          .pipe(tap(() => (this.procedures$ = this.fetchAll(this.idOrgControls))));
        }

      });

    }*/ 
        //if dialog is closed without pressing submit, result comes back as undefined.
        if(result){
          this.procedures$ = this.rest_service
          .post(`http://192.168.0.70:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`,result)
          .pipe(tap(() => (this.procedures$ = this.fetchAll(this.idOrgControls))));
          
          this.procedures$.forEach(async response => {
    
            console.log('response : ' , response)

          //@ts-ignore, For some reason the compiler doesnt think the element has this insert property, but it does in fact have it
            let id = response.insertId
            this.procedureList.push(id)
            //get list of existing milestones,
            //add to list
            //post back to weaknesses
              let tempSub = this.rest_service.get(`http://192.168.0.70:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`);
              tempSub.subscribe(dataArray=>{
                dataArray.forEach(async procedure => {
                    this.procedureList.push(procedure.idOrgProcedure)
                    //TODO Not most efficient way, we really only need to call update once.
                    //but was having scope issues and this works also I dont see an issue where we have enough milestones for this to matter. (tested with 15)
                    let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/controls/${this.loginInfo.CompanyName}/${this.idOrgControls}?UpdateProcedures=true`,this.procedureList)
                    temp2.subscribe();
                });
              })
            });
        }
      });
    }
    public filterprocedure()
    {
      //by updating search, the html data binding updates and the filter is automatically applied.
      this.searchProcedures = (<HTMLInputElement>document.getElementById("searchprocedure")).value.toLowerCase()
    }
  
  ngOnInit(){
 
    this.procedures$ = this.fetchAll(this.idOrgControls);
  }



  
  fetchAll(idOrgControls): Observable<procedures[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/procedures/${idOrgControls}/${this.loginInfo.CompanyName}`);
  }



delete(id: any): void {
  let temp =  this.rest_service.delete(`http://192.168.0.70:3000/procedures/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.procedures$ = this.fetchAll(this.idOrgControls))));

  temp.subscribe(response=>{
    //store its id
    let id = response.insertId
      
    this.procedureList = []
    let tempSub = this.rest_service.get(`http://192.168.0.70:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`);
              tempSub.subscribe(dataArray=>{
                dataArray.forEach(async procedure => {
                    this.procedureList.push(procedure.idOrgProcedure)
                    //TODO Not most efficient way, we really only need to call update once.
                    //but was having scope issues and this works also I dont see an issue where we have enough milestones for this to matter. (tested with 15)
                    let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/controls/${this.loginInfo.CompanyName}/${this.idOrgControls}?UpdateProcedures=true`,this.procedureList)
                    temp2.subscribe();
          });
        })
      })
    }
        
}

@Component({
  selector: 'procedure-dialog',
  templateUrl: 'procedure.html',
  styleUrls: ['./procedure-form.component.scss']

})
export class procedureDialog {
idOrgControls
todaysDate = new Date()
submitted= false;
constructor(private http:HttpClient,
  private formBuilder: FormBuilder,
  private rest_service : restAPI,
  private loginInfo : login,
  private dialogRef : MatDialogRef<procedureDialog>, 
  private milestoneService : ProceduresService,
  @Inject(MAT_DIALOG_DATA) public data : any
  ) { 
  }
ngOnInit(){
  this.idOrgControls = this.data.idOrgControls

}

public procedureSubmit(value) {

}


public onFormReset() {

this.submitted = false;


}   


closeDialog( PProcedure, Pstatus, PstatusDate, Pdescription){
  this.data.PProcedure = PProcedure ? PProcedure : "";
  this.data.Pstatus = Pstatus ? Pstatus : "";

  this.data.PstatusDate = PstatusDate ? PstatusDate : "";
  if (!PstatusDate){ 
    this.data.PstatusDate = this.todaysDate 
  }
  this.data.Pdescription = Pdescription ? Pdescription : ""

  this.data.idOrgControls = this.idOrgControls ? this.idOrgControls : ""


  this.dialogRef.close( this.data );

};
fetchAll(): Observable<procedures[]> {
  return this.rest_service.get(`http://192.168.0.70:3000/procedures/${this.idOrgControls}/${this.loginInfo.CompanyName}`);
}




}   
