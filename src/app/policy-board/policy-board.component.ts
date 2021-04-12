import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { policy } from '../models/policy';
import { PolicyService } from '../services/policy.service';

@Component({
  selector: 'app-policy-board',
  templateUrl: './policy-board.component.html',
  styleUrls: ['./policy-board.component.scss']
})
export class PolicyBoardComponent implements OnInit {
  panelOpenState = false;

   policies$ : Observable<policy[]>;
   policyDict$ : {}
   families$: any[];
   policiesByFamily$: any[];
   policiesByFamilyCMMC$: any[];
   policiesByFamilyNist$: any[];
   toDisplay$;

   temp$;
   allPoliciesDict$;
   counts$: any[];
   famType$;
   routeSub: any;
  constructor(
    private router: Router,
    private policyService : PolicyService,
    private route: ActivatedRoute,
    ) { 
    
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.famType$ = params['type'];
      });
      console.log("famType : " , this.famType$)
    //Creates the list this.families$ that contains all unique family names
    if (this.famType$ != "CMMC" && this.famType$ != "Nist")
    this.policyService.getFamilies().subscribe(e=>{
      this.families$ = []
      let i = 0
      //If for some reason I does not look like its incrementing correctly. 
      //its likely a database entry not fully filled out. 
      e.forEach(element => {
        if (String(element.FamilyPolicy) != 'null'){
          this.families$[i] = String(element.FamilyPolicy)
        }
        i++;
      });

      //Manually adding this to the families though technically they are not families
   /*   this.families$[i] = "CMMC Level 1"
      i++;
      this.families$[i] = "CMMC Level 2"
      i++;
      this.families$[i] = "CMMC Level 3"*/
    })

    //Getting all policies and grouping by Family.
    this.policies$ = this.getAll().subscribe(e=>{
      this.policyDict$ = {}

      let allPoliciesDict = {}
      this.counts$ = []
      
      //makes dictionary of {Nudg ID : Policy}
      e.forEach(element => {

           allPoliciesDict[element.nudgid] = element
      });
      //makes dictionary of {FamilyName: [policies]} format.
      e.forEach(policy =>{
        if(policy){
          this.policiesByFamily$ = []
          if (String(policy.FamilyPolicy) != 'null'){
            if (policy.nudgid){
              this.policyDict$[policy.FamilyPolicy] += "," + policy.nudgid
              this.policyDict$[policy.CMMClevel] += "," + policy.nudgid
              if (String(policy.NISTmapping).includes("NFO")){
                this.policyDict$["NFO"] += "," + policy.nudgid
              }
              if (String(policy.NISTmapping).includes("NIST")){

                this.policyDict$["NISTCUI"] += "," + policy.nudgid

              }
            }
          }
        }
      })

      //TODO This is sort of hardcoded. WILL NEED TO update as DB is added to
      //But after everything is in it likely wont change
      this.policiesByFamily$[0] = this.policyDict$['Access Control']                        .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[1] = this.policyDict$["Identification and Authentication (IA)"].replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[2] = this.policyDict$["Media Protection"]                      .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[3] = this.policyDict$["Physical Protection"]                   .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[4] = this.policyDict$["System and Communication Protection"]   .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[5] = this.policyDict$["System and Information Integrity"]      .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[6] = this.policyDict$["Maintenance"]                           .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[7] = this.policyDict$["Asset Management"]                      .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[8] = this.policyDict$['Audit andAccountability (AU)']          .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[9] = this.policyDict$['Awareness and Training (AT)']           .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[10] = this.policyDict$['Configuration Management']             .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[11] = this.policyDict$['Incident Response']                    .replaceAll("undefined,", "").split(',')

      
      this.policiesByFamilyCMMC$ = []
      this.policiesByFamilyCMMC$[0] = this.policyDict$["1"].replaceAll("undefined,", "").split(',')
      this.policiesByFamilyCMMC$[1] = this.policyDict$["2"].replaceAll("undefined,", "").split(',')
      this.policiesByFamilyCMMC$[2] = this.policyDict$["3"].replaceAll("undefined,", "").split(',')

      this.policiesByFamilyNist$ = []
      this.policiesByFamilyNist$[0] =  this.policyDict$["NFO"].replaceAll("undefined,", "").split(',')
      this.policiesByFamilyNist$[1] =  this.policyDict$["NISTCUI"].replaceAll("undefined,", "").split(',')

      //I made two dictionaries... One deals with grouping the policies by their family name and the other
      //is just an object to hold every policy so we can pull any information we want like this {{allPoliciesDict$[p].nudgid}}
      this.allPoliciesDict$ = allPoliciesDict

      //Repeated calls to count the number of implemented policies in each family
      if (this.famType$ != "Nist" && this.famType$ != "CMMC")
      for (let i = 0; i < this.policiesByFamily$.length; i++){
        this.counts$[i] = this.getImplemented(this.policiesByFamily$[i])
      }


      this.toDisplay$ = []
      this.toDisplay$ = this.policiesByFamily$;

      if (this.famType$ == "CMMC"){
          this.families$ = ["CMMC Level 1", "CMMC Level 2", "CMMC Level 3"]
          this.toDisplay$ = this.policiesByFamilyCMMC$
          for (let i = 0; i < this.policiesByFamily$.length; i++){
            this.counts$[i] = this.getImplemented(this.policiesByFamilyCMMC$[i])
          }
      }
      if (this.famType$ == "Nist"){
           this.families$ = ["NFO", "CUI"]
           this.toDisplay$ = this.policiesByFamilyNist$
           for (let i = 0; i < this.policiesByFamily$.length; i++){
            this.counts$[i] = this.getImplemented(this.policiesByFamilyNist$[i])
          }
      }

      console.log("-------debug-------" ,  "\n" ,  this.families$, "\n" , this.toDisplay$, "\n" , this.policiesByFamilyCMMC$ , "\n" ,  this.policiesByFamilyNist$, "\n" , this.policyDict$ , "\n" , this.policiesByFamily$)


    });


  }


  onRowClicked(row): void {
    console.log("Row clicked |" + String(row) + "|");
  //  this.rowSelected = true;
    var configUrl = ["Policy/" + String(row)];
    console.log(configUrl)
     this.router.navigate(configUrl);

  }
  getAll(){
    return this.policyService.getAll();
  }
  getFamilies(){
    return this.policyService.getFamilies();
  }
  getPoliciesInFamily(family: any){
    return this.policyService.getPoliciesInFamily(family);
  }
  getImplemented(family:any){
    let count = 0
    let total = 0
    family.forEach(nudgid => {
      total += 1
      if (String(this.allPoliciesDict$[nudgid].Pstatus)=="Implemented"){
        count +=1
      }
    });
    return [count, total]
  }
}


