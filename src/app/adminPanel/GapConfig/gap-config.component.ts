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
import { __await } from 'tslib';

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
          .pipe(tap(async () => (this.weaknesses = await this.fetchWeaknesses(this.selectedPolicy))));
          sub4.subscribe(async res=>{
          insertId = res.insertId
          let tempWeaknesses  = []

          if (this.selectedGapEntry.idWeaknessTemplates != "" && this.selectedGapEntry.idWeaknessTemplates != null){
            tempWeaknesses = this.selectedGapEntry.idWeaknessTemplates.split(",")
          }

          tempWeaknesses.push(insertId) 
          this.selectedGapEntry.idWeaknessTemplates = tempWeaknesses.toString()

          let sub5 = await this.gapservice.updateTemplate(this.selectedGapEntry,this.loginInfo.CompanyName)
          sub5.subscribe(async res=>{
            this.weaknesses = await this.fetchWeaknesses(this.selectedPolicy)
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
        
        result.isTemplate = this.selectedGapEntry.idOrgGap
        result.Nid = this.selectedPolicy.nudgid
        let insertId
        console.log("result check : " , result)

          let sub4 = this.controlservice.post(result,this.loginInfo.CompanyName)
          .pipe(tap(async () => (this.controls = await this.fetchControlTemplates(this.selectedPolicy))));
          sub4.subscribe(async res=>{
          insertId = res.insertId
          let tempControls  = []

          if (this.selectedGapEntry.idControlTemplates != "" && this.selectedGapEntry.idControlTemplates != null){
            tempControls = this.selectedGapEntry.idControlTemplates.split(",")
          }

          tempControls.push(insertId) 
          this.selectedGapEntry.idControlTemplates = tempControls.toString()

          let sub5 = await this.gapservice.updateTemplate(this.selectedGapEntry,this.loginInfo.CompanyName)
          sub5.subscribe(async res=>{
                      this.controls = await this.fetchControlTemplates(this.selectedPolicy)

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

      this.weaknesses = await this.fetchWeaknesses(policy);
      this.controls = await this.fetchControlTemplates(policy);
      console.log("weaknesses : " ,this.weaknesses)
      console.log("controls : " ,this.controls)


    }


     fetchWeaknesses(policy){
      return  this.rest_service.get(`http://192.168.0.70:3000/gap/${policy.nudgid}/${this.loginInfo.CompanyName}?weaknesses=${this.selectedGapEntry.idWeaknessTemplates}`).toPromise()
    }
    fetchControlTemplates(policy){
      return this.rest_service.get(`http://192.168.0.70:3000/gap/${policy.nudgid}/${this.loginInfo.CompanyName}?controls=${this.selectedGapEntry.idControlTemplates}`).toPromise()
    }

    
    deleteWeakness(weakness){
      console.log("delete weakness")
        let sub = this.weaknessservice
          .delete(weakness.idOrgWeaknesses,this.loginInfo.CompanyName)
          .pipe(tap(async () => (this.weaknesses = await this.fetchWeaknesses(this.selectedPolicy))));
          sub.subscribe(res =>{

          })

   }

  
   deleteControl(control){
     console.log("control :  " , control)
    let sub  = this.controlservice
    .delete(control.idOrgControls,this.loginInfo.CompanyName)
    .pipe(tap(async () => (this.controls = await this.fetchControlTemplates(this.selectedPolicy))));
    sub.subscribe(res =>{
      console.log("res : " , res)
    })
  }



    fetchPolicy(id): Observable<policy[]> {
      return this.rest_service.get(`http://192.168.0.70:3000/policy/${id}/${this.loginInfo.CompanyName}`);
    }




    fetchAllControls(Nid:any): Observable<controls[]> {
      let CompanyName = this.loginInfo.CompanyName
  
      return this.rest_service.get(`http://192.168.0.70:3000/controls/${Nid}/${CompanyName}`);
    }










  
}



