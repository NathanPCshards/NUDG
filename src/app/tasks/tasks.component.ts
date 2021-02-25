import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  formSubmitted = false;
  taskForm;
  results;
  value;
  displayedColumns: string[] = ['select','name', 'employeeNumber', 'jobTitle', 'jobRole', 'employeeType',
  'department', 'hireDate', 'logonHours','emailAddress', 'phone', 'address', 'CUIdata'];




  constructor(private http:HttpClient, private formBuilder: FormBuilder) { 

  }

  ngOnInit(){
    this.taskForm = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  
  public onFormSubmit(value) {
    this.value = value;
    if (value == "groupForm"){

      console.log("Group form submitted, value: " + value)
      this.formSubmitted = true;
      const configUrl = 'http://localhost:4200/home'; 
      this.http.post(configUrl,this.taskForm.value)
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

    this.formSubmitted = false;
 
}
}