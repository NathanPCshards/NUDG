import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
//@ts-ignore
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { milestones } from '../models/milestones';
import { Observable } from 'rxjs';
import { MilestonesService } from '../services/milestones.service';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';


@Component({
  selector: 'milestoneForm',
  templateUrl: './milestone-form.component.html',
  styleUrls: ['./milestone-form.component.scss']
})
export class MilestoneFormComponent implements OnInit {

  milestones$: Observable<milestones[]>;
  idOrgWeaknesses;
  clickEventsubscription;
  searchMilestones
  rowSelected = false;

  milestoneList
  Nid
  
    constructor(
      private http:HttpClient, 
      private formBuilder: FormBuilder,  
      public dialog: MatDialog, 
      private loginInfo : login,
      private rest_service : restAPI,
      private milestonesService : MilestonesService,
      private dialogRef : MatDialogRef<MilestoneFormComponent>, 
      @Inject(MAT_DIALOG_DATA) public data : any) { 
        this.idOrgWeaknesses = data.idOrgWeaknesses;
        this.Nid = data.Nid

    }
    public openDialog(event) {

      let dialogRef = this.dialog.open(milestoneDialog, {
        width: '1200px',
        height: '550px',
        minHeight: '550px',
        autoFocus : false,
    

        data: {
          idOrgWeaknesses:this.idOrgWeaknesses,
  
        },
  
      });
      this.milestoneList = []

      dialogRef.afterClosed().subscribe(async result => {
        //if dialog is closed without pressing submit, result comes back as undefined.
        if(result){
          this.milestones$ = this.rest_service
          .post(`http://192.168.0.70:3000/milestones/${this.idOrgWeaknesses}/${this.loginInfo.CompanyName}`,result)
          .pipe(tap(() => (this.milestones$ = this.fetchAll(this.idOrgWeaknesses))));
          
          this.milestones$.forEach(async response => {
    
            console.log('response : ' , response)

          //@ts-ignore, For some reason the compiler doesnt think the element has this insert property, but it does in fact have it
            let id = response.insertId
            this.milestoneList.push(id)
            //get list of existing milestones,
            //add to list
            //post back to weaknesses
              let tempSub = this.rest_service.get(`http://192.168.0.70:3000/milestones/${this.idOrgWeaknesses}/${this.loginInfo.CompanyName}`);
              tempSub.subscribe(dataArray=>{
                dataArray.forEach(async milestone => {
                    this.milestoneList.push(milestone.idMilestones)
                    //TODO Not most efficient way, we really only need to call update once.
                    //but was having scope issues and this works also I dont see an issue where we have enough milestones for this to matter. (tested with 15)
                    let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/weaknesses/${this.idOrgWeaknesses}/${this.loginInfo.CompanyName}?UpdateMilestones=true`,this.milestoneList)
                    temp2.subscribe();
                });
              })
            });
        }
      });
    }


  public filterMilestone()
  {
    //by updating search, the html data binding updates and the filter is automatically applied.
    
    this.searchMilestones = (<HTMLInputElement>document.getElementById("searchMilestones")).value.toLowerCase()
  }


  ngOnInit(){
    this.milestones$ = this.fetchAll(this.idOrgWeaknesses);

    
  }

  
fetchAll(idOrgWeaknesses) {
  return this.rest_service.get(`http://192.168.0.70:3000/milestones/${idOrgWeaknesses}/${this.loginInfo.CompanyName}`);
}

  async delete(id: any): Promise<void> {
  let temp =  this.rest_service.delete(`http://192.168.0.70:3000/milestones/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.milestones$ = this.fetchAll(this.idOrgWeaknesses))));
  //Delete the milestone
  
  temp.subscribe(response=>{
    //store its id
    let id = response.insertId
      
    this.milestoneList = []
    let tempSub = this.rest_service.get(`http://192.168.0.70:3000/milestones/${this.idOrgWeaknesses}/${this.loginInfo.CompanyName}`);
    tempSub.subscribe(dataArray=>{
      dataArray.forEach(async milestone => {
          this.milestoneList.push(milestone.idMilestones)
          let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/weaknesses/${this.idOrgWeaknesses}/${this.loginInfo.CompanyName}?UpdateMilestones=true`,this.milestoneList)
          temp2.subscribe();
      });
    })
  })
}



}




@Component({
  selector: 'milestone-dialog',
  templateUrl: 'milestoneForm.html',
  styleUrls: ['./milestone-form.component.scss']

})
export class milestoneDialog {

milestoneForm;
position;
todaysDate = new Date()
idOrgWeaknesses


submitted= false;
  constructor(private http:HttpClient,
     private formBuilder: FormBuilder,
     private dialogRef : MatDialogRef<milestoneDialog>, 
     private loginInfo : login,
     private rest_service : restAPI,
     private milestoneService : MilestonesService,
     @Inject(MAT_DIALOG_DATA) public data : any
     ) { 
     }

ngOnInit(){
  this.idOrgWeaknesses = this.data.idOrgWeaknesses.idOrgWeaknesses;
  console.log("incoming data : " , this.data)
}


public onFormReset() {

this.submitted = false;

}

closeDialog( Milestones, Mstatus, MstatusDate, McompletionDate, Mchanges){
  this.data.Milestones = Milestones;
  this.data.Mstatus = Mstatus;
  this.data.McompletionDate = McompletionDate;
  this.data.MstatusDate = MstatusDate
  this.data.CompanyName = this.loginInfo.CompanyName
  if (!MstatusDate){
    this.data.MstatusDate = this.todaysDate;

  }
  if (!McompletionDate){
    this.data.McompletionDate = this.todaysDate;

  }
  this.data.Mchanges = Mchanges;
  this.data.idOrgWeaknesses = this.idOrgWeaknesses


  this.dialogRef.close( this.data );


};
fetchAll(): Observable<milestones[]> {

  return this.rest_service.get(`http://192.168.0.70:3000/milestones/${this.idOrgWeaknesses}/${this.loginInfo.CompanyName}`);
}





}   


