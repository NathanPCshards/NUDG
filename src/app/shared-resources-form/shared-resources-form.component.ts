import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  displayedColumns: String[] = ['select','id', 'desc','date'];
  
  

    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private sharedResourceService : SharedResourcesService) { }
  
  ngOnInit(){
    this.SRForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
  
    });
  }
  public submit(SRtitle,SRdescription,SRupload) {
    console.log("submitting : " , SRupload)
    this.postSub = this.sharedResourceService.post({SRtitle,SRdescription,SRupload})
    this.postSub.forEach(element => {
      
    });
  
  }
  

}   