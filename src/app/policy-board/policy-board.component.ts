import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { policy } from '../models/policy';
import { PolicyService } from '../services/policy.service';
//delete this trash later
export interface PeriodicElement {
  Subtitle: string;
  Title: string;
  Status: string;
}




@Component({
  selector: 'app-policy-board',
  templateUrl: './policy-board.component.html',
  styleUrls: ['./policy-board.component.scss']
})
export class PolicyBoardComponent implements OnInit {
  panelOpenState = false;

   familyDict$ = {};
   families$: any[];

 
  constructor(
    private route: Router,
    private policyService : PolicyService
    ) { 
    
  }

  ngOnInit() {
    //Creates the list this.families$ that contains all unique family names
    this.families$ = this.policyService.getFamilies().subscribe(e=>{
      this.families$ = []
      let i = 0
      e.forEach(element => {
        if (String(element.FamilyPolicy) != 'null'){
          this.families$[i] = String(element.FamilyPolicy)
          this.familyDict$[String(element.FamilyPolicy)] = []
        }
        i++;
      });
    })
/*


display entries in groups by family

  -get all unique family names
  -display those family names
  -get entries w/ matching family name


trying to make a dictionary here of [family name] = all elements


    for (key of this.familyDict$) {
      console.log(key, value);
    }
     let tempGroup = this.policyService.getPoliciesInFamily(key)
     console.log("tempGroup : ", tempGroup)

    }*/
    
  }


  onRowClicked(row): void {

  }
  getFamilies(){
    return this.policyService.getFamilies();
  }
  getPoliciesInFamily(family: any){
    return this.policyService.getPoliciesInFamily(family);
  }
}

//to setup a service between backend and table
// or implementing custom CDK data source
// 
//https://blog.angular-university.io/angular-material-data-table/









