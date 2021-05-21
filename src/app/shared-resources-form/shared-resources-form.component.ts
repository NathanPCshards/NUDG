import { HttpClient } from '@angular/common/http';
import { resolveForwardRef } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';
import { SharedResourcesService } from '../services/shared-resources.service';

@Component({
  selector: 'app-shared-resources-form',
  templateUrl: './shared-resources-form.component.html',
  styleUrls: ['./shared-resources-form.component.scss']
})
export class SharedResourcesFormComponent implements OnInit {
  SRForm;
  id;
  desc;
  postSub;
  panelOpenState =  false;
  sharedResources$
  displayedColumns: String[] = ['select','id', 'desc','date'];
  fileArray = []
  


  resourceSub$
  fileToShow

  url
  files$
  

    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private sharedResourceService : SharedResourcesService,
      private rest_service : restAPI,
      private loginInfo : login,
      private sanitizer: DomSanitizer) { }
  
  ngOnInit(){

    this.files$ = this.rest_service.getFile('test')
  

    this.sharedResources$ = this.fetchall()


  }

   ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  fetchall(){
    return this.rest_service.get(`http://localhost:3000/sharedResources/${this.loginInfo.CompanyName}`)
  
  }

  
  public submit(SRtitle,SRdescription,SRupload) {
    let data = {SRtitle,SRdescription,SRupload}
    /*

    let temp = this.rest_service.post(`http://localhost:3000/sharedResources/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.sharedResources$ = this.fetchall())));
    temp.subscribe()*/

    let temp = this.rest_service.upload(SRupload)
    temp.subscribe()
  }

  delete(id : any){
    let temp = this.rest_service.delete(`http://localhost:3000/sharedResources/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.sharedResources$ = this.fetchall())));

    temp.subscribe()
  }

  

}   