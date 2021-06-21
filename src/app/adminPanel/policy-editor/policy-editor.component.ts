import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { login } from 'src/app/injectables';
import { controls } from 'src/app/models/controls';
import { policy } from 'src/app/models/policy';
import { standards } from 'src/app/models/standards';
import { ControlsService } from 'src/app/services/controls.service';
import { GuidelinesService } from 'src/app/services/guidelines.service';
import { restAPI } from 'src/app/services/restAPI.service';
import { WeaknessesService } from 'src/app/services/weaknesses.service';


@Component({
  selector: 'app-policy-editor',
  templateUrl: './policy-editor.component.html',
  styleUrls: ['./policy-editor.component.scss']
})
export class PolicyEditorComponent implements OnInit {

  standards$
  weaknesses$
  controls$
  id
  standardsList
  policy$
  
  uniqueNidList$
  NidDisplayList$;
  NidFilter$;

  policyForm: FormGroup = this.formBuilder.group({
    NidFilterList : []
  });
  NidFilterList = []


  constructor(


    private formBuilder: FormBuilder,
    private router:Router, 
    private route: ActivatedRoute,

    private weaknessservice: WeaknessesService,
    private controlsservice: ControlsService,
    private guidelinesService: GuidelinesService,



    private loginInfo: login,
    private rest_service : restAPI


  ) { }

  
  ngOnInit(): void {
    /*
       //Sets defualt page to be AC-N.01
    //Pulling correct policy.
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.Gdate$ = params['Gdate$']
      });
    this.id ? true : this.id = "AC-N.01"
    this.Gdate$ ? true : this.Gdate$ = "1/1/2021"

     // to pull data from the route information


*/


    //getting unique Nudg Id's
    this.uniqueNidList$ = this.rest_service.get(`http://192.168.0.70:3000/Policy/${this.id}/${this.loginInfo.CompanyName}/?getUniqueNids=${true}`);
    this.NidFilter$ = this.policyForm.get('NidFilterList')!.valueChanges
    .pipe(
      startWith(''),
      map(value=> this._filterNid(value))
    )

    this.NidFilter$.forEach(element => {
    });

    //Unique Lists
    this.uniqueNidList$.forEach(element => {
      this.NidFilterList.push(element)
    });

    //POLICY STUFF
    this.policy$ = this.fetchPolicy(this.id);




  this.standards$ = this.fetchAllStandards();
  this.weaknesses$ = this.fetchAllWeaknesses(this.id);
  this.controls$ = this.fetchAllControls(this.id);



}

fetchAllControls(Nid:any): Observable<controls[]> {
  let CompanyName = this.loginInfo.CompanyName

  return this.rest_service.get(`http://192.168.0.70:3000/controls/${Nid}/${CompanyName}`);
} 

updatePolicy(policy,Comments){
  policy.Comments = Comments
  let temp =  this.rest_service.update(`http://192.168.0.70:3000/policy/${policy.nudgid}/${this.loginInfo.CompanyName}`,policy);
  temp.subscribe()

}

fetchAllWeaknesses(Nid: any) {
  return this.weaknessservice.fetchAll(Nid, this.loginInfo.CompanyName);
}



fetchAllStandards(): Observable<standards[]> {
  return this.rest_service.get(`http://192.168.0.70:3000/standards/${this.id}/${this.loginInfo.CompanyName}`)
}

async deleteStandards(id: any): Promise<void> {


  let temp = await this.rest_service.delete(`http://192.168.0.70:3000/standards/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
  temp.subscribe()

  this.standardsList = []

  let standardSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idStandards`)
  standardSub.forEach(async dataArray => {
    dataArray.forEach(element => {
      //Converting String of "[id1,id2,id3]" to a real array
      let standard_ids =  element.idStandards.trim().replace("\[","").replace("\]","").split(",")
      standard_ids.forEach(id => {
        //Adding ids from policy to temp array
        this.standardsList.push(Number(id))
      });
    });
    //Remove the correct control
    let index = this.standardsList.indexOf(id)
    if (index != -1){
      this.standardsList.splice(this.standardsList.indexOf(id), 1)
    }


    let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idStandards`,{"nudgid":this.id, "data" :this.standardsList})
    temp2.subscribe();
  });
   
}





_filterNid(value: string){
  value = value.toLowerCase()
  this.NidFilterList.forEach(element => {
    if (value){
      this.NidDisplayList$ = element.filter(x=>x.nudgid.toLowerCase().includes(value))
      return element.filter(x=> x.nudgid.toLowerCase().includes(value))
    }
      this.NidDisplayList$ = element
      return element

  });
  
  }




  public policySearch(event: any, name : any)
  {
      //By routing to a random place, then back to the policy page we force the window to refresh and update data
      //Otherwise it would route to Policy/AC-N.02 and still show AC-N.01's page.
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["Policy/",name]));
    
  }


  fetchPolicy(id): Observable<policy[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/policy/${id}/${this.loginInfo.CompanyName}`);
  }





}