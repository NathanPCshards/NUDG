import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-company-info-form',
  templateUrl: './company-info-form.component.html',
  styleUrls: ['./company-info-form.component.scss']
})
export class CompanyInfoFormComponent {
  submitted = false;
  companyInfoForm;
  results; 

  constructor(private http: HttpClient, private formBuilder: FormBuilder
   

  ) { }

  ngOnInit(){
    this.companyInfoForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here
    });
  }


  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    this.http.post(configUrl,this.companyInfoForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);
 }

 public onFormReset() {
   console.log("Form was reset")
 }

}
