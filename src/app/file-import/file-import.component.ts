import { Component, HostListener, OnInit } from '@angular/core';
import { login } from '../injectables';
import { ControlsService } from '../services/controls.service';
import { GapService } from '../services/gap.service';
import { restAPI } from '../services/restAPI.service';
import { SharedService } from '../services/Shared';
import { WeaknessesService } from '../services/weaknesses.service';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss']
})
export class FileImportComponent implements OnInit {
  fileType: string;
  fileTypes: string[] = ['Weakness', 'Control', 'Standard', 'Gap Assessment'];
  fileOver;

  constructor(    
    public controlService : ControlsService,
    public weaknessService : WeaknessesService,
    public sharedService : SharedService,
    public gapService : GapService,
    private rest_service : restAPI,
    private loginInfo : login
    ) { }

  ngOnInit(): void {
  }
  uploadFile(evt, fileType){
//TODO at some point this function should be combined with the one in drag-drop.directive
//just make it in 1 file and export it to the other.
    var f = (<HTMLInputElement>document.getElementById('fileDropRef')).files[0];
    let reader = new FileReader()

    const files = evt;
    console.log("type : " , fileType)
    if (f){
       if (this.isCSVfile(f)){
         reader.readAsText(f)
         reader.onload = async () =>{
           let csvData = reader.result
           let dataArray = String(csvData).replace("\r","").split('\n')
           console.log("dataArray : " , dataArray)
           let CompanyName = this.loginInfo.CompanyName
            if (fileType == "Control"){
                    //TODO this part of code is bound to change at some point.
                    //whatever template we decide on for imports, just follow the pattern below to match it, Assign variables, then async + post
                    for (let index = 1; index < dataArray.length; index++) {
                      const entry = dataArray[index].split(",");
                      //console.log("entry :" ,  entry)
                      let Nid = entry[0].replace("\r","")  
                      let Cname = entry[1].replace("\r","")  
                      let Coverview = entry[2].replace("\r","")  
                      let Cissuedate = entry[3].replace("\r","")  
                      let Csharedresources = entry[4].replace("\r","")  
                      let Curl = entry[5].replace("\r","")  
                      let idOrgWeaknesses = entry[6].replace("\r","")    

                      await this.controlService
                          .post({Nid, Cname, Coverview, Cissuedate, Csharedresources, Curl, CompanyName, idOrgWeaknesses},this.loginInfo.CompanyName).toPromise()
                       }
            }
            if (fileType == "Weakness"){
              for (let index = 1; index < dataArray.length; index++) {
                const entry = dataArray[index].split(",");
                      let Nid = entry[0]
                      let Wname = entry[1]
                      let WdetectionDate = entry[2]
                      let WvendorDependency = entry[3]
                      let WriskRating = entry[4]
                      let WriskAdjustment = entry[5]
                      let WadjustedRiskRating = entry[6];
                      let WdetectionSource = entry[7]
                      let WcompletionDate = entry[8]
                      let WremediationPlan = entry[9]
                      let WautoApprove = entry[10]
                      let WoperationReq = entry[11]
                      let Wstatus = entry[12]
                      let WassetID = entry[13]
                      let WlastChange = entry[14]
                      let Wdescription = entry[15]
                      let WlastvendorCheck = entry[16]
                      let WdeviationRationale =entry[17]
                      let WfalsePositive =  entry[18]
                      let WpointOfContact = entry[19]
                      let WresourceReq =    entry[20]
                      let WsupportingDoc =  entry[21]
                      
                      await this.weaknessService
                      .post({Nid , Wname, WdetectionDate, WvendorDependency, WriskRating, WriskAdjustment, WadjustedRiskRating, WdetectionSource, WcompletionDate, WremediationPlan, WautoApprove, WoperationReq, Wstatus, WassetID, WlastChange, Wdescription, WlastvendorCheck, WdeviationRationale, WfalsePositive, WpointOfContact, WresourceReq, WsupportingDoc, CompanyName}, CompanyName).toPromise()
                   }
              }
            
            if (fileType == "Standard"){
              for (let index = 1; index < dataArray.length; index++) {
                const entry = dataArray[index].split(",");
                      let Nid = entry[0]
                      let Standard = entry[1]


                      await this.rest_service.post(`http://localhost:3000/standards/${Nid}/${this.loginInfo.CompanyName}`,this.loginInfo.CompanyName).toPromise()

                   }
            }
            if (fileType == "Gap Assessment"){
              for (let index = 1; index < dataArray.length; index++) {
                const entry = dataArray[index].split(",");
                //console.log("entry :" ,  entry)
                let Nid = entry[0].replace("\r","")  
                let Ganswer = entry[1].replace("\r","")  
                let Gquestion = entry[2].replace("\r","")  
                let Gcomment = entry[3].replace("\r","")  
                let Gdate = entry[4].replace("\r","")  
              

                await this.gapService
                    .post({Nid, Ganswer, Gquestion, Gcomment, Gdate, CompanyName},this.loginInfo.CompanyName ).toPromise()
                 }
            }

           }
           
       }
       else{
         alert("Please upload a valid .csv File.")
       }
      }
      this.sharedService.refresh()
     }
   // let files = evt.srcElement.files; 
    // File can now be uploaded by doing an http post with the payload
  

    isCSVfile(file: any) {  
      return file.name.endsWith(".csv");  
    }  
  
}


