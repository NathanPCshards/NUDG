import { Component, OnInit } from '@angular/core';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';

@Component({
  selector: 'app-poam',
  templateUrl: './poam.component.html',
  styleUrls: ['./poam.component.scss']
})
export class POAMComponent implements OnInit {
  panelOpenState = false
  weaknesses$
  selected$
  policies$
  displayInformation = {}
  searchResults$
  printList$
  checkedList$;
  gap = []


  currentComment = "Weakness Comments"


  constructor(public rest_service : restAPI, public loginInfo : login) { }

  async ngOnInit(): Promise<void> {
    this.searchResults$ = []
    this.printList$ = []
    this.checkedList$ = []

    this.weaknesses$ = this.fetchAllWeaknesses()
    this.weaknesses$.subscribe()
    //Getting all policies and grouping in several ways. All data is held in displayInformation
    this.policies$ = this.rest_service.get(`http://192.168.0.70:3000/Policy/${'All'}/${this.loginInfo.CompanyName}`)
    this.displayInformation["All"] = []
    this.gap = []
    this.policies$.forEach(dataArray => {
      dataArray.forEach(policy => {

      let temp = []

        if (this.displayInformation[policy.FamilyPolicy]){
          temp = this.displayInformation[policy.FamilyPolicy]
          temp.push(policy)
          this.displayInformation[policy.FamilyPolicy] = temp
        }
        else{
          temp.push(policy)
          this.displayInformation[policy.FamilyPolicy] = temp
        }
        temp = []
        if (this.displayInformation[policy.CMMClevel]){
          temp = this.displayInformation[policy.CMMClevel]
          temp.push(policy)
          this.displayInformation[policy.CMMClevel] = temp
        }
        else{
          temp.push(policy)
          this.displayInformation[policy.CMMClevel] = temp
        }
        temp = []
        if (this.displayInformation[policy.Pstatus]){
          temp = this.displayInformation[policy.Pstatus]
          temp.push(policy)
          this.displayInformation[policy.Pstatus] = temp
        }
        else{
          temp.push(policy)
          this.displayInformation[policy.Pstatus] = temp
        }
        temp = []
        
        if (policy.NISTmapping){
          if (policy.NISTmapping == "NFO"){
            if (this.displayInformation[policy.NISTmapping]){
              temp = this.displayInformation[policy.NISTmapping]
              temp.push(policy)
              this.displayInformation[policy.NISTmapping] = temp
            }
            else{
              temp.push(policy)
              this.displayInformation[policy.NISTmapping] = temp
            }
          }
          else{
            //Any policy that isnt NFO, is CUI. 
            if (this.displayInformation["CUI"]){
              temp = this.displayInformation["CUI"]
              temp.push(policy)
              this.displayInformation["CUI"] = temp
            }
            else{
              temp.push(policy)
              this.displayInformation["CUI"] = temp
            }
          }
        }


      });
    });


    let temp2 = []
    let date
     await this.weaknesses$.forEach(async array => {//making a list of Nids to use to pull gap
      temp2 = []
       array.forEach(async element => {
        if (element.Nid && element.Nid != "" && !temp2.includes(`'${element.Nid}'`)){
          console.log("pushing : " , element.Nid)
          //this.rest_service.get(most recent, individual gap)
          let singleGap = this.rest_service.get(`http://192.168.0.2:3000/gap/${element.Nid}/${this.loginInfo.CompanyName}`)
          temp2.push(`\'${element.Nid}\'`)
          console.log("temp : " , temp2)
        }
      });
         
      let maxDate = await this.rest_service.get(`http://192.168.0.70:3000/gap/Any/${this.loginInfo.CompanyName}?maxDate='Ok`).toPromise()
      console.log("maxDate : " , maxDate, maxDate["Max(Gdate)"])
      for(const property in maxDate){
         date = maxDate[property]['Max(Gdate)']
      }
      console.log("date : ", date)
      console.log("temp : " ,  temp2.toString())
      let temp3  = await this.rest_service.get(`http://192.168.0.70:3000/gap/Any/${this.loginInfo.CompanyName}?getFromList=${temp2.toString()}&date=${date}`)
      //Pulling the most recent gap
      //TODO this looks good, need to finish the display part in the html
      
      temp3.subscribe(res=>{
        res.forEach(element => {
          if (element.Gcomment != null){
            console.log("element g comment : " , element.Nid, element.Gcomment)

            if (element.Nid in this.gap && this.gap[element.Nid] != 'No Comments Made'){
              console.log("existing element and not blank", element)
              this.gap[element.Nid].push(element)
            }
            else{
              console.log("new, element added for first time : " , element)
              this.gap[element.Nid] = [element]

            }
        }
        else if (!(element.Nid in this.gap)){
          console.log("Entry has no comment and is not in gap : " ,  element)
          this.gap[element.Nid] = 'No Comments Made'

        }

        });

      })

    })



    console.log("gap : " , this.gap)

  }

  fetchAllWeaknesses(){
    return this.rest_service.get(`http://192.168.0.70:3000/weaknesses/All/${this.loginInfo.CompanyName}`)
  }


  search(text,columnFilter){
    //Given input text. Iterate over weaknesses, Iterate over each of their properties, if the property matches what you searched, push it to list.
    let columns = []
 
    this.searchResults$ = []
    //do nothing for blank input
    if (text && columnFilter){
      //Add to results based on filters chosen (iterate over specific properties)
      this.weaknesses$.forEach(dataArray => {
        dataArray.forEach(weakness => {
          var index = 0
          for (const property in weakness){
            if (property != null){
              //Here we iterate over properties... weakness[property] is a dynamic way to access an objects properties
              if(columnFilter.includes(String(index)) && String(weakness[property]).toLowerCase().includes(text)){
                this.searchResults$.push(weakness)
              }
              index++
            }
          }
        });
      });
    }
    if (!columnFilter){
      //Add to results based on nudg id. (Check single property)
      this.weaknesses$.forEach(dataArray => {
        dataArray.forEach(weakness => {
          //check if our Id contains what we typed
          if (weakness.nudgid.toLowerCase().includes(text)){
            this.searchResults$.push(weakness)
          }
        });
      });
    }
    else{
      //No text input given, nothing to do.
    }
 
  }



  swapComments(entry){
    console.log("entry : " , entry)

    if (this.currentComment == "Weakness Comments"){
      this.currentComment = "Gap Comments"
    }
    else{
      this.currentComment = "Weakness Comments"
    }

  }

  makeReport(reportFilter){
    //this function takes a list of family names/indexes, adds them to a list
    //that list is then used to make the print view in css. This is updated as the search is updated as well.
    //TODO likely could be rewritten to be faster
    this.printList$ = []
    console.log("report filter : ", reportFilter)
    console.log("display : " , this.displayInformation)

    this.weaknesses$.forEach(dataArray => {
      dataArray.forEach(weakness => {//for every weakness
        reportFilter.forEach(filter => {//for every filter
          if (filter == "Query"){ //If query selected, push query list to print list
            this.searchResults$.forEach(element => {
              if (!this.printList$.includes(element)){
                this.printList$.push(element)
              }
            });
          }
          else if (filter == "Checkboxes"){//If query selected, push checkbox list to print list
            this.checkedList$.forEach(element=>{
              if (!this.printList$.includes(element[1])){
                console.log("pushing element : " , element[1])
              this.printList$.push(element[1])
              }
            })
          }
          else{ //All other information is held in displayInformation, and is dynamically accessed again.
            for (let index = 0; index < this.displayInformation[filter].length; index++) { //for everything in that group
              const policy = this.displayInformation[filter][index];
              if (policy.nudgid == weakness.Nid){//if the weakness nudgid matches the policy nudg id in the group.
                if (!this.printList$.includes(weakness)){
                  this.printList$.push(weakness) //add the weakness
                }
              }
            }
          }
        });
  

      });
    });

    console.log("printlist : " , this.printList$)
  }
  printPage(){
   window.print()
   
  }


  checkToggled(event, weakness){
 
    console.log("weakness : " , weakness)


    let checkbox = event.target as HTMLElement
    if (checkbox.innerText =="check_box"){
        checkbox.innerText ="check_box_outline_blank"
        for (let index = 0; index < this.checkedList$.length; index++) {
          const element = this.checkedList$[index];
          if (element[1].idOrgWeaknesses == weakness.idOrgWeaknesses){
            this.checkedList$.splice(index, 1)
          }
        }

    }else{
      checkbox.innerText ="check_box"
      this.checkedList$.push([weakness.idOrgWeaknesses,weakness])

    }
  }

}
