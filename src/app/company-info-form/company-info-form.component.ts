import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { login } from '../injectables';
import { companyInfo } from '../models/companyInfo';
import { restAPI } from '../services/restAPI.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.scss']
})
export class CompanyInfoFormComponent {
  panelOpenState = false;
  companies$: Observable<companyInfo[]>;
  Users$;
  allCompanies
  YCountforHTML
  XCountForHTML
  loadedCompany
  companyFilterList
  CompanyFilter$
  imageOrganizer

  companyForm: FormGroup = this.formBuilder.group({
    CompanyFilterList : []
  });
  
  constructor(  

    private rest_service : restAPI,
    private loginInfo : login,
    private formBuilder: FormBuilder,
     

  ) { }

  async ngOnInit(){
    this.imageOrganizer = {}
    this.companies$ = this.fetchAll();
    this.allCompanies =  await this.rest_service.get(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`).toPromise()
    this.Users$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);
    this.Users$.subscribe()
    this.companies$.subscribe()
    this.initHtmlArrays();
    this.loadedCompany = this.allCompanies[0]



    this.allCompanies.forEach(element => {
      if (element.imageUrl){
          this.imageOrganizer[element.imageUrl] = element.imageUrl
          console.log("imageOrganizer : " , this.imageOrganizer)

      }
    });


  this.CompanyFilter$ = this.companyForm.get('NidFilterList')!.valueChanges
  .pipe(
    startWith(''),
    map(value=> this._filterCompany(value))
  )

  //serves as observable subscription
  this.CompanyFilter$.forEach(element => {
  });


  }

  fetchAll(): Observable<companyInfo[]> {

    return this.rest_service.get(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`);
  }

  loadCompany(company){
    console.log("loading company : " , company)
    this.loadedCompany = company
  }


  _filterCompany(value){

      value = value.toLowerCase()
      console.log("Nid Filter1 : " , this.CompanyFilter$)
    this.companyFilterList.forEach(element => {
      
      if (value){
        console.log("element : " , element)
        this.allCompanies = element.filter(x=>x.Nid.toLowerCase().includes(value))
        return element.filter(x=> x.Nid.toLowerCase().includes(value))
      }
        this.allCompanies = element
        return element
  
    });
    

  }

   post(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber){
    
    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
     CIprimaryPoC = CIprimaryPoC ? CIprimaryPoC : ""
     CISBAcertified = CISBAcertified ? CISBAcertified : ""
     CIbusinessType = CIbusinessType ? CIbusinessType : ""
     CIcmmcAuditDate = CIcmmcAuditDate ? CIcmmcAuditDate : ""
     CINISTauditorDate = CINISTauditorDate ? CINISTauditorDate : ""


    let uploaded = (<HTMLInputElement>document.getElementById("files")).files[0]
 

    //save file to folder
    const formData = new FormData()
    formData.append("file", uploaded);
    let temp2 = this.rest_service.upload(formData)

    temp2.subscribe(result=>{
      console.log("result : " , result)
    })

   let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, CInumber, CompanyName : this.loginInfo.CompanyName, imageUrl : uploaded.name }
    
   console.log("posting :  ",   data)
   let temp =  this.rest_service.post(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`,data)
   .pipe(tap(() => (this.companies$ = this.fetchAll())));
   temp.subscribe()
  }

  debug(){
    console.log("selected company : " , this.loadedCompany)
  }

   update(CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, idCompanyInfo) {
  
    //The mat form fields will send if no input is given. Here we initialize those fields to be empty strings so our backend doesnt crash on a empty post
    CIprimaryPoC = CIprimaryPoC ? CIprimaryPoC : ""
    CISBAcertified = CISBAcertified ? CISBAcertified : ""
    CIbusinessType = CIbusinessType ? CIbusinessType : ""
    CIcmmcAuditDate = CIcmmcAuditDate ? CIcmmcAuditDate : ""
    CINISTauditorDate = CINISTauditorDate ? CINISTauditorDate : ""

    
    let data = {CIcompanyinformation, CIdescription, CIname, CIDBA, CIphone, CIwebsite, CIaddress, CIprimaryPoC, CISBAcertified, CIbusinessType, CItechnicalPOCinformation, CIDUNSnum, CIcagecode, CIcmmcAuditAgency, CIcmmcAuditorInfo, CIcmmcAuditDate, CIcmmcNISTauditAgency, CINISTauditorInfo, CINISTauditorDate, idCompanyInfo, CompanyName : this.loginInfo.CompanyName}
  
    this.loadedCompany = data;

    let temp  =  this.rest_service.update(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.companies$ = this.fetchAll())));
     temp.subscribe()
  }


    delete(idCompanyInfo: any) {

      let temp = this.rest_service.delete(`http://192.168.0.70:3000/CompanyInfo/${idCompanyInfo}/${this.loginInfo.CompanyName}`)
     .pipe(tap(() => (this.companies$ = this.fetchAll())));
     temp.subscribe()
  }

  populateForm(data){
    console.log("user : " , data)
    //Normal fields

    /* TODO finish this. (copy pasted a bunch but not changed to work 7/22/2021)
    let temp = (<HTMLInputElement>document.getElementById("CIcompanyinformation")).value = data.FWpolicyNum
    temp = (<HTMLInputElement>document.getElementById("CIdescription")).value = data.FWservice
    temp = (<HTMLInputElement>document.getElementById("CIname")).value = data.FWdescription
    temp = (<HTMLInputElement>document.getElementById("CIDBA")).value = data.FWports
    temp = (<HTMLInputElement>document.getElementById("CIphone")).value = data.FWsource
    temp = (<HTMLInputElement>document.getElementById("CIwebsite")).value = data.FWoutbound
    temp = (<HTMLInputElement>document.getElementById("CIaddress")).value = data.FWinbound
    temp = (<HTMLInputElement>document.getElementById("CIprimaryPoC")).value = data.FWcreationDate
    
    temp = (<HTMLInputElement>document.getElementById("CISBAcertified")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIbusinessType")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CItechnicalPOCinformation")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIDUNSnum")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcagecode")).value = data.FWcreationDate

    temp = (<HTMLInputElement>document.getElementById("CIcmmcAuditAgency")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcmmcAuditorInfo")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcmmcAuditDate")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcmmcNISTauditAgency")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CINISTauditorInfo")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcagecode")).value = data.FWcreationDate
    temp = (<HTMLInputElement>document.getElementById("CIcagecode")).value = data.FWcreationDate

    */
    //Mat Selects


    /*
     this.FWsupplierRelation$ = data.FWsupplierRelation
     this.FWvendorRelation$ = data.FWvendorRelation
     this.FWcuiContract$ = data.FWcuiContract
     this.IassetIdentifier$ = data.IassetIdentifier
     this.FWprotocol$ = data.FWprotocol*/



    //TODO Mat Select Multiple: cant figure out a way to select checkboxes. Tried using formgroup/passing array to set function
    //maybe target the html element and set it that way
  
  
  
  
  }

  async initHtmlArrays(optionalArray = []){   
    this.allCompanies = await this.rest_service.get(`http://192.168.0.70:3000/CompanyInfo/${this.loginInfo.CompanyName}`).toPromise()

    console.log("optional array : " , this.allCompanies)
    for(const property in this.allCompanies){
      console.log("property check : " ,  property)
      console.log("value check : ",  this.allCompanies[property])
    }
    //If an array is sent as input, make the 2d array from that.
    //if an array is not sent, make the 2d array from the policy list
    //an array is sent from the search filter results
    let amountInRow = 5
    let numRows 
    let temp
    if (optionalArray.length > 0){
      optionalArray = optionalArray.sort((a,b)=>{

        return a.nudgid > b.nudgid ? 1 : 0 
      })

      numRows = Math.ceil(optionalArray.length/amountInRow-1)
      this.XCountForHTML = Array(5).fill(amountInRow)
      this.YCountforHTML = []
      temp = []
      optionalArray.map((element,index)=>{
        if (index%amountInRow == 0 && index != 0){

        this.YCountforHTML[this.YCountforHTML.length] = temp.sort()
        //this.YCountforHTML.sort()
        temp = []
      }
      temp.push(element)
    })



    if (temp != []){
      this.YCountforHTML[this.YCountforHTML.length] = temp
    }

    }
    else{
      this.allCompanies = this.allCompanies.sort((a,b)=>{

        return a.nudgid > b.nudgid
      })
      let amountInRow = 5
      numRows = Math.ceil(this.allCompanies.length/amountInRow-1)
     
      this.XCountForHTML = Array(5).fill(amountInRow)
      this.YCountforHTML = []


    temp = []
    this.allCompanies.map((element,index)=>{
      if (index%amountInRow == 0 && index != 0){

        this.YCountforHTML[this.YCountforHTML.length] = temp.sort()
        //this.YCountforHTML.sort()
        temp = []
      }
      temp.push(element)
    })



    if (temp != []){
      this.YCountforHTML[this.YCountforHTML.length] = temp
    }

    }

   
    //Transpose the 2d array here to display in more coherent order.
    let temp3 = this.YCountforHTML[0].map((_, colIndex) =>  this.YCountforHTML.map(row => row[colIndex]));
    this.YCountforHTML = temp3

  
    for (let index = 0; index < this.YCountforHTML.length; index++) { //for every colum
      this.YCountforHTML[index] = this.YCountforHTML[index].filter(x=>{
        return x !== undefined
      })
    }

    console.log("html arrays : " ,  this.YCountforHTML, this.XCountForHTML)
  }


  tabSwitched(event){
    console.log("tab switched")
    console.log("event : " , event)

  
  }

}
