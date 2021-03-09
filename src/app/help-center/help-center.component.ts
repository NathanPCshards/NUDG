import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}





@Component({
  selector: 'help-center-form',
  templateUrl: 'helpCenterForm.html',
  styleUrls: ['./help-center.component.scss']

})
export class helpCenterForm {
value;
helpCenterForm;
position;
id;
desc;
date;
milestones;
displayedColumns: String[] = ['select','id', 'desc','date'];


submitted= false;
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

ngOnInit(){
  this.helpCenterForm  = this.formBuilder.group({
    //initialize stuff to be null or whatever, here

  });
}
public submit() {

    this.submitted = true;
  
}


public onFormReset() {
  console.log("FORM WAS Reset");

this.submitted = false;

}
}   
