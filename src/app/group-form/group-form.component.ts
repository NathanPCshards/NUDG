import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  submitted = false;
  groupForm;
  results;



  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.groupForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  public onFormSubmit() {
    console.log("FORM WAS SUBMITTED");
    this.submitted = true;
    const configUrl = 'http://localhost:4200/home'; 
    this.http.post(configUrl,this.groupForm.value)
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
