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

  roleSubmitted = false;
  roleForm;
  value;
  results;
  panelOpenState = false;



  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.roleForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  public onFormSubmit(value) {
    this.value = value;
    if (value == "roleForm"){

      console.log("Role form submitted, value: " + value);
      this.roleSubmitted = true;
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

   

 }

 public onFormReset(value) {
   console.log("Reset role form, value : " + value);
   console.log(value == "roleForm");
  if (value == "roleForm"){
    this.roleSubmitted = false;
  }

}

}


