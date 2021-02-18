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

  groupSubmitted = false;
  groupForm;
  results;
  value;
  



  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.groupForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }

  
  public onFormSubmit(value) {
    this.value = value;
    if (value == "groupForm"){

      console.log("Group form submitted, value: " + value)
      this.groupSubmitted = true;
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

 }

 public onFormReset(value) {
   console.log("group form reset. value  " + value);
   console.log(value == "groupForm");
  if (value == "groupForm"){
    this.groupSubmitted = false;
  }

}
  
}
  

