
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

ngOnInit(){
  //Getting standards
  this.urls = []
  this.files = []

  this.standards$ =  this.rest_service.get(`http://192.168.0.70:3000/standards/${this.id$}/${this.loginInfo.CompanyName}`)

  this.displayStandards$ = []
  this.standards$.forEach(standardarray => {
    standardarray.forEach(standard => {
        this.displayStandards$.push(standard)
    });
  });



 


  


 




  //Getting resources
  this.resources$ = this.rest_service.get(`http://192.168.0.70:3000/sharedResources/${this.loginInfo.CompanyName}`)





 
  this.displayResources$ = []
  this.resources$.forEach(resourcesArray => {
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

}


submit(Cname, Coverview, Cissuedate, CsharedresourcesskRating, Curl, idOrgWeaknesses){
  this.data.Nid = this.id$ 
  this.data.Cname = Cname;
  this.data.Coverview = Coverview;
  this.data.Cissuedate = Cissuedate;
  this.data.Csharedresources = CsharedresourcesskRating;
  this.data.Curl = Curl;
  this.data.idOrgWeaknesses = idOrgWeaknesses
  this.data.CompanyName = this.loginInfo.CompanyName
 

  //This is subscribed to in identifier page oninit.
  this.controlsservice.emit(this.data)
  

};


getid$(): string { return this.id$; }
setid$(id$: string) {
  this.id$ = (id$);
}


}
