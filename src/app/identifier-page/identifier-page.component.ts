import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-identifier-page',
  templateUrl: './identifier-page.component.html',
  styleUrls: ['./identifier-page.component.scss']
})
export class IdentifierPageComponent implements OnInit {
  submitted = false;
  idPage;
  results;



  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.idPage = this.formBuilder.group({
      //initialize some stuff here
    });
  }

}
