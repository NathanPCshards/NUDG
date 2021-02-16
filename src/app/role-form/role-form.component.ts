import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  submitted = false;
  roleForm;
  results;



  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.roleForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    this.http.post(configUrl,this.roleForm.value)
    .pipe(
      tap(
        data => console.log(configUrl, data),
        error => console.log(configUrl, error)
      )
    )
    .subscribe(results => this.results = results);
 }

 public onFormReset() {

}

}
