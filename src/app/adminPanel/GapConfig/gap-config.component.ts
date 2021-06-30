import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { controlDialog } from 'src/app/control-form/control-form.component';
import { login } from 'src/app/injectables';
import { controls } from 'src/app/models/controls';
import { policy } from 'src/app/models/policy';
import { ControlsService } from 'src/app/services/controls.service';
import { GapService } from 'src/app/services/gap.service';
import { restAPI } from 'src/app/services/restAPI.service';
import { WeaknessesService } from 'src/app/services/weaknesses.service';
import { weaknessDialog } from 'src/app/weakness-form/weakness-form.component';

@Component({
  selector: 'app-gap-config',
  templateUrl: './gap-config.component.html',
  styleUrls: ['./gap-config.component.scss']
})
export class GapConfigComponent implements OnInit {

  constructor(
    private rest_service : restAPI,
    private loginInfo : login,
    private dialog : MatDialog,
    private weaknessservice : WeaknessesService,
    private controlservice : ControlsService,
    private gapservice : GapService
  ) { }

  gap
  policies
  id
  dataDictionary = {}
  weaknesses$
  controls$
  selectedGapEntry
  selectedPolicy
  weaknesses = []
  controls = []

  async ngOnInit(): Promise<void> {
    this.policies = []
    this.gap = []
    

    this.policies = await this.rest_service.get(`http://192.168.0.70:3000/policy/All/${this.loginInfo.CompanyName}`).toPromise()

    this.policies.forEach(async element => {
      this.dataDictionary[element.nudgid] = await this.rest_service.get(`http://192.168.0.70:3000/gap/${element.nudgid}/${this.loginInfo.CompanyName}?uniqueQuestionByNid=true`).toPromise()
    });


    console.log("data :" , this.dataDictionary)
  }


  public openWeakness() {
    const dialogRef = this.dialog.open(weaknessDialog, {
      data: {
              Nid:this.selectedPolicy.nudgid
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result){
        
        result.isTemplate = this.selectedGapEntry.idOrgGap
        result.Nid = this.selectedPolicy.nudgid
        let insertId
        console.log("result check : " , result)

          let sub4 = this.weaknessservice.post(result,this.loginInfo.CompanyName)
          .pipe(tap(() => (this.setQuestion(this.selectedPolicy,this.selectedGapEntry))));
          sub4.subscribe(async res=>{
          insertId = res.insertId
          let tempWeaknesses  = []

          if (this.selectedGapEntry.idWeaknessTemplates != "" && this.selectedGapEntry.idWeaknessTemplates != null){
            tempWeaknesses = this.selectedGapEntry.idWeaknessTemplates.split(",")
          }

          tempWeaknesses.push(insertId) 
          this.selectedGapEntry.idWeaknessTemplates = tempWeaknesses.toString()

          let sub5 = await this.gapservice.updateTemplate(this.selectedGapEntry,this.loginInfo.CompanyName)
          sub5.subscribe(res=>{
          })
        })

      }

    });
  }

  public openControl() {
    const dialogRef = this.dialog.open(controlDialog, {
      data: {
              Nid:this.selectedPolicy.nudgid
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result){
        console.log("selectedGapEntry : " , this.selectedGapEntry)
        result.isTemplate = this.selectedGapEntry.idOrgGap
        result.Nid = this.selectedPolicy.nudgid
        let tempControls = this.selectedGapEntry.idControlTemplates.split(",")
        tempControls.push()
        this.selectedGapEntry.idControlTemplates = tempControls.toString()

          


        let sub5 = await this.controlservice.post(result,this.loginInfo.CompanyName)
        let insertId
        sub5.subscribe(async res=>{
          console.log("res : " , res)
            insertId = res.insertId
            let tempControls  = []

            if (this.selectedGapEntry.idControlTemplates != ""){
              tempControls = this.selectedGapEntry.idControlTemplates.split(",")
            }

            tempControls.push(insertId) 
            this.selectedGapEntry.idControlTemplates = tempControls.toString()
            console.log("entry : " ,this.selectedGapEntry)
            let sub5 = await this.gapservice.updateTemplate(this.selectedGapEntry,this.loginInfo.CompanyName)
            sub5.subscribe(res=>{
              console.log("result2 : " , res)
            })
      })

      }

    });



  }

    async setQuestion(policy,gap){
      this.weaknesses = []
      this.controls = []
      console.log("policy : " ,policy)
      console.log("gap : " , gap)

      this.selectedGapEntry = gap
      this.selectedPolicy = policy



        //TODO these need to be specific to each question
      this.weaknesses = await this.rest_service.get(`http://192.168.0.70:3000/gap/${policy.nudgid}/${this.loginInfo.CompanyName}?weaknesses=${this.selectedGapEntry.idWeaknessTemplates}`).toPromise()
      this.controls = await this.rest_service.get(`http://192.168.0.70:3000/gap/${policy.nudgid}/${this.loginInfo.CompanyName}?controls=${this.selectedGapEntry.idControlTemplates}`).toPromise()
      console.log("weaknesses : " ,this.weaknesses)
      console.log("controls : " ,this.controls)


    }

  
    loadTables(){

    }


    fetchPolicy(id): Observable<policy[]> {
      return this.rest_service.get(`http://192.168.0.70:3000/policy/${id}/${this.loginInfo.CompanyName}`);
    }




    fetchAllControls(Nid:any): Observable<controls[]> {
      let CompanyName = this.loginInfo.CompanyName
  
      return this.rest_service.get(`http://192.168.0.70:3000/controls/${Nid}/${CompanyName}`);
    }

    updateControls(id: number, inventoryItem: Partial<controls>): void {

    }
    async deleteControls(id: any): Promise<void> {
      /*
      let CompanyName = this.loginInfo.CompanyName
      this.ctrlList = []
  
      let temp = this.rest_service.delete(`http://192.168.0.70:3000/controls/${id}/${CompanyName}`)
      .pipe(tap(() => (this.controls$ = this.fetchAllControls(this.id))));
      temp.subscribe()
  
      
      let ctrlSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idControls`)
      ctrlSub.forEach(async dataArray => {
        dataArray.forEach(element => {
          //Converting String of "[id1,id2,id3]" to a real array
          let control_ids =  element.idControls.trim().replace("\[","").replace("\]","").split(",")
          control_ids.forEach(id => {
            //Adding ids from policy to temp array
            this.ctrlList.push(Number(id))
          });
        });
        //Remove the correct control
  
        let index = this.ctrlList.indexOf(id)
        if (index != -1){
          this.ctrlList.splice(this.ctrlList.indexOf(id), 1)
        }
  
  
        let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idControls`,{"nudgid":this.id, "data" :this.ctrlList})
        temp2.subscribe();
      });
     */
    }








  
}



