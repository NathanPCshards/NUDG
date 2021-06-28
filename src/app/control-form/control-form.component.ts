
import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { controls } from '../models/controls';
import { ControlsService } from '../services/controls.service';
import { restAPI } from '../services/restAPI.service';
import { SharedService } from '../services/Shared';
import { SharedResourcesService } from '../services/shared-resources.service';
import { WeaknessesService } from '../services/weaknesses.service';
import { weaknessDialog } from '../weakness-form/weakness-form.component';


@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styleUrls: ['./control-form.component.scss']
})
export class ControlFormComponent implements OnInit {
  panelOpenState = false;
  controls$: Observable<controls[]>;

  constructor(){
  }

  /*
  public openDialog() {
      const dialogRef =this.dialog.open(controlDialog, {
      height: '80%',
       width:"85%",
       disableClose: true, 
       data: {
        Nid:""

    }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("test : " , this.loginInfo.CompanyName)

      this.controls$ = this.rest_service
      .post(`http://192.168.0.70:3000/controls/${this.loginInfo.CompanyName}`, result)
    });

  }
*/
  ngOnInit(){

  }

  /*
  delete(id: any): void {
    this.controls$ = this.controlssservice
      .delete(id,this.loginInfo.CompanyName)
     // .pipe(tap(() => (this.controls$ = this.fetchAll())));
      
  }*/

}

@Component({
  selector: 'control-dialog',
  templateUrl: 'controlForm.html',
  styleUrls: ['./control-form.component.scss']

})
export class controlDialog {
controlForm;

controls$: Observable<controls[]>;
position;
procedure;
standards$;
resources$
displayStandards$;
displayResources$
displayWeakness$
weakness$
files
urls
resourceDisplay$
todaysDate = new Date()
@Input()

//setting defualt ID
public id$;

constructor(

  @Optional() private dialogRef : MatDialogRef<weaknessDialog>,
  @Inject(MAT_DIALOG_DATA) public data : any,
  public controlsservice : ControlsService,
  public sharedResourceService : SharedResourcesService,
  public weaknessService : WeaknessesService,
  public rest_service : restAPI,
  public loginInfo : login,
  private sanitizer: DomSanitizer
  ) { }

  async ngOnInit(){
  //Getting standards
  this.urls = []
  this.files = []
  if (this.data.Nid){
    this.id$ = this.data.Nid
  }

  this.standards$ =  await this.rest_service.get(`http://192.168.0.70:3000/standards/${this.id$}/${this.loginInfo.CompanyName}`)
  
  this.displayStandards$ = []
  this.standards$.forEach(standardarray => {
    standardarray.forEach(standard => {
        this.displayStandards$.push(standard)
    });
  });



  //Getting resources
  this.resources$ = await this.rest_service.get(`http://192.168.0.70:3000/sharedResources/${this.loginInfo.CompanyName}`)


  this.displayResources$ = []
  await this.resources$.forEach(resourcesArray => {
    resourcesArray.forEach(resource => {
        this.displayResources$.push(resource)
       //TODO was working on getting links showing on the resources menu
          /*
        //saving files to an array
        this.files.push(resource.SRupload)
        this.rest_service.getFile(resource.SRupload).subscribe(data=>{
          this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data)))
            */
        })
    });
 


  
  //Getting weaknesses
  this.weakness$ = this.weaknessService.fetchAll(this.id$, this.loginInfo.CompanyName)
  this.displayWeakness$ = []
  this.weakness$.forEach(weaknessArray => {

    weaknessArray.forEach(weakness => {

        this.displayWeakness$.push(weakness)
    });
  });









  console.log("debug : " , this.displayWeakness$)
  console.log("debug : " , this.standards$)


}


submit(Nid, Cname, Coverview, Cissuedate, CsharedresourcesskRating, Curl, idOrgWeaknesses, Standards){
  this.data.Nid = this.id$ ? this.id$ : Nid ? Nid : ""
  this.data.Cname = Cname ? Cname : ""
  this.data.Coverview = Coverview ? Coverview : ""
  this.data.Cissuedate = Cissuedate ? Cissuedate : ""
  this.data.Csharedresources = CsharedresourcesskRating ? CsharedresourcesskRating : ""
  this.data.Curl = Curl ? Curl : ""
  this.data.idOrgWeaknesses = idOrgWeaknesses ? idOrgWeaknesses : ""
  this.data.CompanyName = this.loginInfo.CompanyName ? this.loginInfo.CompanyName : ""
  this.data.Standards = Standards ? Standards: ""
 
  console.log("data : " , this.data)



  try{
    //this works when opened as a dialog (the weakness page)
    //but fails when used only as a form (policy/identifier page)
    this.dialogRef.close( this.data );
  }
   
    catch(err){
      //in the case that it fails, we instead emit a signal for a different component to listen to
      //and send a post request for us. (this is received in identifier-page.component.ts, by subscribe in INIT) 3/25
      this.controlsservice.emit(this.data)
    }
  


};


getid$(): string { return this.id$; }
setid$(id$: string) {
  this.id$ = (id$);
}


}
