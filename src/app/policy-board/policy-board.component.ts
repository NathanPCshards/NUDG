import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { login } from '../injectables';
import { policy } from '../models/policy';
import { restAPI } from '../services/restAPI.service';

@Component({
  selector: 'app-policy-board',
  templateUrl: './policy-board.component.html',
  styleUrls: ['./policy-board.component.scss']
})
export class PolicyBoardComponent implements OnInit {
  panelOpenState = false;

   policies$ :any
   policyDict$ : {}
   families$: any[];
   policiesByFamily$: any[];
   policiesByFamilyCMMC$: any[];
   policiesByFamilyNist$: any[];
   masterList$;
   sortType;
   printList$;

   temp$;
   searchResults$;
   allPoliciesDict$;
   counts$: any[];
   famType$;
   routeSub: any;
   implementedQuery$
   //Sets default value of columns to search to Nid
   selected$ = ['0']
  constructor(
    private router: Router,
    private rest_service : restAPI,
    private loginInfo : login,
    private route: ActivatedRoute,
    
    ) { 
    
  }

  ngOnInit() {

    this.searchResults$ = []
    
    this.routeSub = this.route.params.subscribe(params => {
      console.log("params : " ,params)
      this.famType$ = params['type'];
      });

    //Creates the list this.families$ that contains all unique family names
    //In the case of CMMC and Nist views, this.families is changed to cmmclevel 1 2 3, and NFO/ CUI
    if (this.famType$ != "CMMC" && this.famType$ != "Nist")
    this.rest_service.get(`http://localhost:3000/Policy/${'All'}/${this.loginInfo.CompanyName}/?FamilyPolicy=${true}`).subscribe(e=>{
      this.families$ = []
      let i = 0
      e.forEach(element => {
        if (String(element.FamilyPolicy) != 'null'){
          this.families$[i] = String(element.FamilyPolicy)
        }
        i++;
      });
    })

    //Getting all policies and grouping by Family.
    this.policies$ = this.rest_service.get(`http://localhost:3000/Policy/${'All'}/${this.loginInfo.CompanyName}`)

    //Initialize Dictionaries and lists
    this.policyDict$ = {}
    let allPoliciesDict = {}
    this.counts$ = []

    //iterate over returned policies
    this.policies$.subscribe(e=>{
      
      e.forEach(policy => {
        //makes dictionary of {Nudg ID : Policy}
        allPoliciesDict[policy.nudgid] = policy

        //makes groupings of {CMMClevels : Policy} {Family : Policy} (in same dictionary)
        this.policyDict$[policy.FamilyPolicy] += "," + policy.nudgid
        this.policyDict$[policy.CMMClevel] += "," + policy.nudgid

        if (String(policy.NISTmapping).includes("NIST")){
          //If policy is a part of the NIST, add it to the NIST group
          this.policyDict$["NISTCUI"] += "," + policy.nudgid

        }

      })

      this.policiesByFamily$ = []
      
      //TODO This is sort of hardcoded. WILL NEED TO update as DB is added to
      //But after everything is in it likely wont change
      this.policiesByFamily$[0] = this.policyDict$["Access Control (AC)"]                  .replaceAll("undefined,", "").split(',')
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

      //loading information to be displayed
      this.loadMasterList()


    })

  }

  loadMasterList(){
      //masterlist: [Family, [PoliciesOfFamily], [Counts/Score information]]
      //the masterlist is responsible for all information that gets displayed on screen.
      //And is initialized dependending on the 'view' opened.
      //Family View
      this.masterList$ = []
      if (this.famType$ != "Nist" && this.famType$ != "CMMC"){
        for (let index = 0; index < this.families$.length; index++) {
          this.masterList$[index] = [this.families$[index], this.getInfoFromId(this.policiesByFamily$[index]), this.getImplemented(this.policiesByFamily$[index])] 
        }
      }
      //CMMC View
      if (this.famType$ == "CMMC"){
          this.families$ = ["CMMC Level 1", "CMMC Level 2", "CMMC Level 3"]
          for (let index = 0; index < this.families$.length; index++) {
            this.masterList$[index] = [this.families$[index], this.getInfoFromId(this.policiesByFamilyCMMC$[index]), this.getImplemented(this.policiesByFamilyCMMC$[index])] 
          }
      }
      //Nist View
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

  }

  viewChange(view){
    if(view == "CMMC"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies/CMMC'))
    }
    if(view == "Nist"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies/Nist'))
    }
    if(view =="All"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigateByUrl('/Policies'))
    }

  }

  makeReport(reportFilter){
    //this function takes a list of family names/indexes, adds them to a list
    //that list is then used to make the print view in css. This is updated as the search is updated as well.
    this.printList$ = []
    reportFilter.forEach(async filter => {
      if (filter == "NFO"){
        //Iterate over NFO policies and push them
        this.getInfoFromId(this.policiesByFamilyNist$[0]).forEach(element => {
          this.printList$.push(this.allPoliciesDict$[element[0]])
        });
      }
      else if (filter =="Query"){
        this.searchResults$.forEach(element => {
          this.printList$.push(this.allPoliciesDict$[element[0]])

        });
      }
      else if (filter == "CUI"){
        //Iterate over CUI policies and push them
        this.getInfoFromId(this.policiesByFamilyNist$[1]).forEach(element => {
          this.printList$.push(this.allPoliciesDict$[element[0]])
        });
      }
      else if (filter == "Level1"){
        //Iterate over cmmc level 1 policies and push them
        this.getInfoFromId(this.policiesByFamilyCMMC$[0]).forEach(element => {
          this.printList$.push(this.allPoliciesDict$[element[0]])
        });

      }
      else if (filter == "Level2"){
        //Iterate over cmmc level 2 policies and push them

        this.getInfoFromId(this.policiesByFamilyCMMC$[1]).forEach(element => {
          this.printList$.push(this.allPoliciesDict$[element[0]])
        });
      }
      else if (filter == "Level3"){
        //Iterate over cmmc level 3 policies and push them

        this.getInfoFromId(this.policiesByFamilyCMMC$[2]).forEach(element => {
          this.printList$.push(this.allPoliciesDict$[element[0]])
        });
      }
      else{
        //Iterate over specific level 2 families (based on check boxes)

        let fams = [`Access Control (AC)`, `Asset Management (AM)`, `Audit and Accountability (AU)`, `Awareness and Training (AT)`, `Configuration Management (CM)`,`Identification and Authentication (IA)`, `Incident Response (IR)`,
        `Maintenance (MA)`, `Media Protection (MP)`, `Personnel Security (PS)`, `Physical Protection (PE)`, `Recovery (RE)`, `Risk Management (RM)`,`Security Assessment (CA)`, `Situational Awareness (SA)`, `System Development (SD)`,
      `System and Communication Protection (SC)`, `System and Information Integrity (SI)`]

  
        let temp = await this.getPoliciesInFamily(fams[filter])
        temp.forEach(policiesInFamily => {
          policiesInFamily.forEach(policy => {
            this.printList$.push(policy)
          });
        });

      }


      
    });
    this.printList$.sort(function(a,b){
      return a.nudgid > b.nudgid
    })

  }
  printPage(){
    window.print()
  }

  search(text,columnFilter){
    //Given input text, iterate through each policy's column and it doesnt contain the text, remove that policy.
    //This can be rewritten to be faster/more efficient (combine the removal with finding the index)

    //Initializing some data
    this.loadMasterList()
    
    this.searchResults$ = []
    //do nothing for blank input
    if (text){
    //ITERATING OVER all families
    this.masterList$.forEach(element => {
      let family = element[1]
      //ITERATING OVER all policies in a family
      for (let familyIndex = 0; familyIndex < family.length; familyIndex++) {
        const policy = family[familyIndex];
        //ITERATING OVER Policy Columns
        if(columnFilter && columnFilter.length != 0){
          //Given a list of indicies (columnFilter), that match up to a policy column, only iterate over those given columns
          let columnsToFilter = columnFilter
          for (let index = 0; index < columnsToFilter.length; index++) {
            const columnIndex = columnsToFilter[index];
            const element = policy[columnIndex].toLowerCase()
             if (element.includes(text.toLowerCase())){
                //After any column matches the criteria, we add it to our results, and set index = to the end, to escape the loop
                this.searchResults$.push(policy)
                index = columnsToFilter.length
            }
          } 
        }
        else{
          //Given no columns to filter by, iterate through ONLY NIDs
          for (let index = 0; index < policy.length; index++) {

            //TODO Currently only normalizing string by lowercase, likely should use more string methods to trim input
            const element = policy[index].toLowerCase();
            if (element.includes(text.toLowerCase())){
              //After any column matches the criteria, we add it to our results, and set index = to the end, to escape the loop
              this.searchResults$.push(policy)
              index = policy.length
  
            }
          }
        }
      }
    });
    //Getting a list of IDs that the result returned, so we can count which ones are implemented
    let nidList = []
    this.searchResults$.forEach(element => {
      nidList.push(element[0])
    });
    this.implementedQuery$ = this.getImplemented(nidList)
    }


  }

  showAdvanced(){
     //Currently used to help debugging might use later???
    console.log("Debug")
    console.log("Master List: ", this.masterList$)
    

   
   // console.log("policy dict : " ,this.policyDict$)
    console.log("pol by fam ", this.policiesByFamily$)
    console.log("this.families : " ,this.families$)
    console.log("search result : ", this.searchResults$)
  }

  onRowClicked(row): void {
     //Navigates to Policy when clicked
     var configUrl = ["Policy/" + String(row).trim()];
     this.router.navigate(configUrl);

  }
  getAll(){
    //Gets all Policies associated with a company name
    return this.rest_service.get(`http://localhost:3000/Policy/${'All'}/${this.loginInfo.CompanyName}`);
  }
  getFamilies(){
    //Gets all unique family names associated with a Company name (although policies should be the same between companies)
    return this.rest_service.get(`http://localhost:3000/Policy/${'All'}/${this.loginInfo.CompanyName}/?FamilyPolicy=${true}`)
  }
  getPoliciesInFamily(family: any){
    //Get all policies associated with a specific Family
    return this.rest_service.get(`http://localhost:3000/Policy/${'All'}/${this.loginInfo.CompanyName}/?Family=${family}`)
  }
  getImplemented(policyArray:any){
    //takes in a list of Nids, ["AC-N.01", "AM.-N.02", ...] and returns an array of the implementation status counts
    let count = 0
    let total = 0
    let score = 0
    let potentialScore = 0
    policyArray.forEach(nudgid => {
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
  getInfoFromId(id){
      //takes a array of Nids, returns a list of respective objects

    let info = []
    for (let index = 0; index < id.length; index++) {
      const element = id[index];
      let policy = this.allPoliciesDict$[element]
      info.push([String(policy.nudgid).trim(),String(policy.Subtitle).trim(), String(policy.CMMCnumber).trim(), String(policy.Pstatus).trim(), String(policy.NISTmapping).trim(), String(policy.CMMClevel).trim()])
    }

    return info
  }

  sort(family, column){    
    family = family.trim()
    //These numbers are the alphabetical order on page
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
   

        if (this.sortType == String(column)){
          this.masterList$[indexDict[family]][1].sort(function(a,b) {

            return a[1] < b[1] 
          })
          this.sortType = ""
        }
        else{
          this.sortType = String(column);
          this.masterList$[indexDict[family]][1].sort(function(a,b) {

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

  sortResults(column){
    let indexDict = 0
    let family = 0
    //Note slightly different than other sorting function
    switch(String(column)){
      case "ByID":
        if (this.sortType == String(column)){
          this.searchResults$.sort(function(a,b){
            return a[0] > b[0]
          })
          this.sortType = ""
        }
        else{
          this.searchResults$.sort(function(a,b){
            return a[0] < b[0] })
          this.sortType = column
        }
        
        break;
      case "BySubtitle":
   

        if (this.sortType == String(column)){
          this.searchResults$.sort(function(a,b) {

            return a[1] < b[1] 
          })
          this.sortType = ""
        }
        else{
          this.sortType = String(column);
          this.searchResults$.sort(function(a,b) {

            return a[1] > b[1] 
          })
          this.sortType = column;
        }

        break;
      case "ByCMMC":
        if (this.sortType == String(column)){
          this.searchResults$.sort(function(a,b) {
            return a[2] < b[2]
          })
          this.sortType = ""
        }
        else{
          this.searchResults$.sort(function(a,b) {
            return a[2] > b[2]
          })
          this.sortType = column;

        }

        break;
      case "ByStatus":
        if (this.sortType == String(column)){
          this.searchResults$.sort(function(a,b) {
            return a[3] < b[3]
          })
          this.sortType = ""
        }
        else{
          this.searchResults$.sort(function(a,b) {
            return a[3] > b[3]
          })
          this.sortType = column
        }

          break;
      case "ByNIST":
        if (this.sortType == String(column)){
          this.searchResults$.sort(function(a,b) {
            return a[4] < b[4]
          })
          this.sortType = ""
        }
        else{
          this.searchResults$.sort(function(a,b) {
            return a[4] > b[4]
          })
          this.sortType = column
        }

        break;
      case "ByLevel":
        if (this.sortType == String(column)){
          this.searchResults$.sort(function(a,b) {
            return a[5] < b[5]
          })
          this.sortType =""
        }
        else{
          this.searchResults$.sort(function(a,b) {
            return a[5] > b[5]
          })
          this.sortType = column
        }

        break;
    }
  
  }
 



}


