import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { login } from 'src/app/injectables';
import { policy } from 'src/app/models/policy';
import { ControlsService } from 'src/app/services/controls.service';
import { GuidelinesService } from 'src/app/services/guidelines.service';
import { restAPI } from 'src/app/services/restAPI.service';
import { WeaknessesService } from 'src/app/services/weaknesses.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {


  guideline$ 
  policy$
  families;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router, 
    private route: ActivatedRoute,
    private guidelinesService: GuidelinesService,
    private loginInfo: login,
    private rest_service : restAPI
  ) { }

  async ngOnInit(): Promise<void> {
    //TODO
    //get a list of families, put in mat select to chose from. but also give option to make new family?
    //Also likely need to recomend a name for the policy based on existing ones...
    //(picking family Account Control should default to name AC-N(something))

    this.families = await this.rest_service.get(`http://192.168.0.70:3000/policy/All/${this.loginInfo.CompanyName}?FamilyPolicy=ok`).toPromise()
    console.log("Families : ",  this.families)
    //POLICY STUFF
    this.policy$ = this.fetchAllPolicies();

    this.policy$.forEach(element => {
        console.log("element : " , element)
    });

    /*
  this.guideline$ = this.getByID(this.id)
  this.guideline$.subscribe(res=>{
    console.log('result : ' , res)
  })

*/

  }

  setFamily(value){
    //@ts-ignore
    document.getElementById("FamilyPolicy").value = value
  }

  fetchAllPolicies(): Observable<policy[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/policy/All/${this.loginInfo.CompanyName}`);
  }

  submit(nudgid, CMMCnumber, CMMClevel, NISTmapping, NISTvalue, Capabilitynumber, Practice, FamilyPolicy, Discussion, Clarification, ReferencesP, Pstatus, Subtitle, Comments, Guidelines){
 

    let data = {nudgid, CMMCnumber, CMMClevel, NISTmapping, NISTvalue, Capabilitynumber, Practice, FamilyPolicy, Discussion, Clarification, ReferencesP, Pstatus, Subtitle, Comments, CompanyName: this.loginInfo.CompanyName}
  

    let temp = this.rest_service.post(`http://192.168.0.70:3000/policy/`,data)
    temp.subscribe(res=>{
      console.log("res : " ,res)
    })




    let temp2 = this.rest_service.post(`http://192.168.0.70:3000/Guidelines/${this.loginInfo.CompanyName}`,{Nid:nudgid, Guidelines})
    temp2.subscribe(res=>{
      console.log("res2 : " ,res)
    })



 
 
  }
}
