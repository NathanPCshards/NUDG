import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  picker;
  submitted = false;
  UserForm;
  results;// = res.json();
  

  constructor(private http: HttpClient, private formBuilder: FormBuilder){

  }

  ngOnInit(){
    this.UserForm = this.formBuilder.group({
      //initialize stuff to be null or whatever, here

    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    /*
    this.http.post(configUrl,this.UserForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);*/
 }


 public onFormReset() {
  this.submitted = false;
}


}
