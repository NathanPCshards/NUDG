import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { login } from './injectables';
import { ControlsService } from './services/controls.service';
import { GapService } from './services/gap.service';
import { SharedService } from './services/Shared';
import { StandardsService } from './services/standards.service';
import { WeaknessesService } from './services/weaknesses.service';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
@Input()
fileType;


  @HostBinding('class.fileover') fileOver: boolean;
  constructor(    
    public controlService : ControlsService,
    public weaknessService : WeaknessesService,
    public standardsService : StandardsService,
    public sharedService : SharedService,
    public gapService : GapService,
    public loginInfo : login) { }
  @HostListener('dragover', ['$event'] ) public ondragover(evt){
    evt.preventDefault();
    evt.stopPropagation();
   // console.log('drag over')
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    //console.log('drag leave')
  }
  @HostListener('drop', ['$event']) public ondrop(evt) {
   console.log("check 2 :" ,  this.fileType)
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    let reader = new FileReader()
    if (files.length > 0 ){
     // emit the files through a service to be used somewhere else.
    //  console.log('you dropped ',files.length,' files')

      if (this.isCSVfile(files[0])){
        reader.readAsText(files[0])
        reader.onload = async () =>{
          let csvData = reader.result
          let dataArray = String(csvData).split('\n')
          if (this.fileType == "Control"){
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
              let CompanyName = this.loginInfo.CompanyName

              await this.controlService
                  .post({Nid, Cname, Coverview, Cissuedate, Csharedresources, Curl, CompanyName, idOrgWeaknesses},this.loginInfo.CompanyName)
                  .pipe(tap(()=>(this.sharedService.emit("Control")))).toPromise()
                  
               }
            }
          if (this.fileType == "Weakness"){
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
                    let CompanyName = this.loginInfo.CompanyName
                    await this.weaknessService
                    .post({Nid , Wname, WdetectionDate, WvendorDependency, WriskRating, WriskAdjustment, WadjustedRiskRating, WdetectionSource, WcompletionDate, WremediationPlan, WautoApprove, WoperationReq, Wstatus, WassetID, WlastChange, Wdescription, WlastvendorCheck, WdeviationRationale, WfalsePositive, WpointOfContact, WresourceReq, WsupportingDoc, CompanyName }, CompanyName).toPromise()
                  }
            }
            if (this.fileType == "Standard"){
              for (let index = 1; index < dataArray.length; index++) {
                const entry = dataArray[index].split(",");
                      let Nid = entry[0]
                      let Standard = entry[1]


                      await this.standardsService
                      .post({Nid , Standard}).toPromise()
                   }
            }
            if (this.fileType == "Gap Assessment"){
              for (let index = 1; index < dataArray.length; index++) {
                const entry = dataArray[index].split(",");
                //console.log("entry :" ,  entry)
                let Nid = entry[0].replace("\r","")  
                let Ganswer = entry[1].replace("\r","")  
                let Gquestion = entry[2].replace("\r","")  
                let Gcomment = entry[3].replace("\r","")  
                let Gdate = entry[4].replace("\r","")  
              

                await this.gapService
                    .post({Nid, Ganswer, Gquestion, Gcomment, Gdate}).toPromise()
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

  isCSVfile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
}
