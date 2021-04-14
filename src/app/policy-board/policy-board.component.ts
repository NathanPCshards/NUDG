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
   masterList$;
   sortType;

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
      this.policiesByFamily$[0] = this.policyDict$['Access Control (AC)']                  .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[1] = this.policyDict$["Identification and Authentication (IA)"].replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[2] = this.policyDict$["Media Protection (MP)"]                      .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[3] = this.policyDict$["Physical Protection (PE)"]                   .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[4] = this.policyDict$["Asset Management (AM)"]                      .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[5] = this.policyDict$['Audit and Accountability (AU)']         .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[6] = this.policyDict$['Awareness and Training (AT)']           .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[7] = this.policyDict$['Configuration Management (CM)']              .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[8] = this.policyDict$['Incident Response (IR)']                     .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[9] = this.policyDict$["Maintenance (MA)"]                           .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[10] = this.policyDict$['Personnel Security (PS)']                   .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[11] = this.policyDict$['Recovery (RE)']                             .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[12] = this.policyDict$['Risk Management (RM)']                      .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[13] = this.policyDict$['Security Assessment (CA)']                  .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[14] = this.policyDict$["Situational Awareness (SA)"]                .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[15] = this.policyDict$["System and Communication Protection (SC)"]  .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[16] = this.policyDict$['System Development (SD)']                   .replaceAll("undefined,", "").split(',')
      this.policiesByFamily$[17] = this.policyDict$['System and Information Integrity (SI)']     .replaceAll("undefined,", "").split(',')

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

     // console.log("-------debug-------" ,  "\n" ,  this.families$, "\n" , this.policiesByFamilyCMMC$ , "\n" ,  this.policiesByFamilyNist$, "\n" , this.policyDict$ , "\n" , this.policiesByFamily$ , "\n" , this.allPoliciesDict$)



      //masterlist: [Family, [PoliciesOfFamily], [Counts/Score information]]
      //the masterlist is responsible for all information that gets displayed on screen.
      this.masterList$ = []
      if (this.famType$ != "Nist" && this.famType$ != "CMMC"){
        for (let index = 0; index < this.families$.length; index++) {
          this.masterList$[index] = [this.families$[index], this.getInfoFromId(this.policiesByFamily$[index]), this.getImplemented(this.policiesByFamily$[index])] 
        }
      }

      if (this.famType$ == "CMMC"){
          this.families$ = ["CMMC Level 1", "CMMC Level 2", "CMMC Level 3"]
          for (let index = 0; index < this.families$.length; index++) {
            this.masterList$[index] = [this.families$[index], this.getInfoFromId(this.policiesByFamilyCMMC$[index]), this.getImplemented(this.policiesByFamilyCMMC$[index])] 
          }
      }

      if (this.famType$ == "Nist"){
           this.families$ = ["NFO", "CUI"]
            for (let index = 0; index < this.families$.length; index++) {
            this.masterList$[index] = [this.families$[index], this.getInfoFromId(this.policiesByFamilyNist$[index]), this.getImplemented(this.policiesByFamilyNist$[index])] 
          }
      }
      //initializing everything to be ABC order
      this.masterList$.sort()
      this.masterList$.forEach(element => {
        element[1].sort()
      });
      console.log("masterlist: " ,  this.masterList$)

    });


  }


  onRowClicked(row): void {
    console.log("Row clicked |" + String(row) + "|");
  //  this.rowSelected = true;
    var configUrl = ["Policy/" + String(row).trim()];
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
    let score = 0
    let potentialScore = 0
    family.forEach(nudgid => {
      total += 1
      if (this.allPoliciesDict$[nudgid].NISTvalue){
        potentialScore += this.allPoliciesDict$[nudgid].NISTvalue
      }
      if (String(this.allPoliciesDict$[nudgid].Pstatus)=="Implemented"){
        count +=1
        if (this.allPoliciesDict$[nudgid].NISTvalue){
          score += this.allPoliciesDict$[nudgid].NISTvalue
        }
      }
    });
    return [count, total, score, potentialScore]
  }
  //takes a array of Nids, returns a list of respective objects
  getInfoFromId(id){
    let info = []
    for (let index = 0; index < id.length; index++) {
      const element = id[index];
      let policy = this.allPoliciesDict$[element]
      info.push([String(policy.nudgid).trim(),String(policy.Subtitle).trim(), String(policy.CMMCnumber).trim(), String(policy.Pstatus).trim(), String(policy.NISTmapping).trim(), String(policy.CMMClevel).trim()])
    }

    return info
  }


  sort(family, column){    
    console.log("sort called : " , family, column)
    console.log('master list before : ', this.masterList$)
    family = family.trim()
    let indexDict = {
      "Access Control (AC)" : 0,
      "Identification and Authentication (IA)" : 5,
      "Media Protection (MP)" : 8,
      "Physical Protection (PE)": 10,
      "Asset Management (AM)": 1,
      'Audit and Accountability (AU)': 2,
      'Awareness and Training (AT)': 3,
      'Configuration Management (CM)':4,
      'Incident Response (IR)': 6,
      "Maintenance (MA)": 7,
      'Personnel Security (PS)': 9,
      'Recovery (RE)' : 11,
      'Risk Management (RM)' : 12,
      'Security Assessment (CA)' : 13,
      "Situational Awareness (SA)": 14,
      "System and Communication Protection (SC)": 15,
      'System Development (SD)' : 16,
      'System and Information Integrity (SI)' : 17,
      "CMMC Level 1" : 0,
      "CMMC Level 2" : 1,
      "CMMC Level 3" : 2,
      "CUI": 0,
      "NFO": 1,

    }

    //theres a lot of data unpacking going on here, just console log if u need to know what anything is
    //this is the controller for to sort each column
    switch(String(column)){
      case "ByID":
        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort()
          this.sortType = ""
        }
        else{
          this.masterList$[indexDict[family]][1].sort(function(a,b){return b - a})
          this.sortType = column
        }
        
        break;
      case "BySubtitle":
        console.log("test")

        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
        //    console.log(a[1] < b[1])
            return a[1] < b[1] 
          })
          this.sortType = ""
        }
        else{
          this.sortType = String(column);
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
         //   console.log(a[1] > b[1])
            return a[1] > b[1] 
          })
          this.sortType = column;
        }

        break;
      case "ByCMMC":
        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[2] < b[2]
          })
          this.sortType = ""
        }
        else{
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[2] > b[2]
          })
          this.sortType = column;

        }

        break;
      case "ByStatus":
        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[3] < b[3]
          })
          this.sortType = ""
        }
        else{
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[3] > b[3]
          })
          this.sortType = column
        }

          break;
      case "ByNIST":
        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[4] < b[4]
          })
          this.sortType = ""
        }
        else{
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[4] > b[4]
          })
          this.sortType = column
        }

        break;
      case "ByLevel":
        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[5] < b[5]
          })
          this.sortType =""
        }
        else{
          this.masterList$[indexDict[family]][1].sort(function(a,b) {
            return a[5] > b[5]
          })
          this.sortType = column
        }

        break;
    }
  }




}


