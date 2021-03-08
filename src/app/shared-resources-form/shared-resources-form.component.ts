import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shared-resources-form',
  templateUrl: './shared-resources-form.component.html',
  styleUrls: ['./shared-resources-form.component.scss']
})
export class SharedResourcesFormComponent implements OnInit {
  SRForm;
  id;
  desc;

  displayedColumns: String[] = ['select','id', 'desc','date'];
  
  
  submitted= false;
    constructor(private http:HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.SRForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
  
    });
  }
  public submit() {
    console.log("form submitted")

  
  }
  
  
  public onFormReset() {
    console.log("FORM WAS Reset");
  
  this.submitted = false;
  
  }
}   