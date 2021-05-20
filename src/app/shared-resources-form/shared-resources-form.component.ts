import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  
  

    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private sharedResourceService : SharedResourcesService,
      private rest_service : restAPI,
      private loginInfo : login) { }
  
  ngOnInit(){
    this.sharedResources$ = this.fetchall()

    this.SRForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
  
    });
  }
  fetchall(){
    return this.rest_service.get(`http://localhost:3000/sharedResources/${this.loginInfo.CompanyName}`)
  
  }
  public submit(SRtitle,SRdescription,SRupload) {
    let data = {SRtitle,SRdescription,SRupload}
    let temp = this.rest_service.post(`http://localhost:3000/sharedResources/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.sharedResources$ = this.fetchall())));
    temp.subscribe()
  }
  delete(id : any){
    let temp = this.rest_service.delete(`http://localhost:3000/sharedResources/${id}/${this.loginInfo.CompanyName}`)
    .pipe(tap(() => (this.sharedResources$ = this.fetchall())));

    temp.subscribe()
  }

  

}   