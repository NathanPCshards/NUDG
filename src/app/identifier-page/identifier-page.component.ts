import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';






export interface PeriodicElement {
  Subtitle: string;
  Title: string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Title: "NIST Mapping", Subtitle: 'Account Management', Status: "Implemented"},
  {Title: "AC-N.02", Subtitle: 'Access Enforcement', Status: "Implemented", },
  {Title: "AC-N.03", Subtitle: 'Use of External Information Systems', Status: "Implemented"},
  {Title: "AC-N.15", Subtitle: 'System Use Notification', Status: "Not Implemented"},
];






@Component({
  selector: 'app-identifier-page',
  templateUrl: './identifier-page.component.html',
  styleUrls: ['./identifier-page.component.scss']
})
export class IdentifierPageComponent implements OnInit {
  submitted = false;
  idPage;
  results;
  panelOpenState;
  displayedColumns: string[] = ['Title', 'Subtitle', 'Status'];
  dataSource = ELEMENT_DATA;
  rowSelected = false;
  name: any;


  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.idPage = this.formBuilder.group({
      //initialize some stuff here
    });
  }


  onRowClicked(row): void {
    console.log("Row clicked: ", row);
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
    console.log(configUrl)
   // this.router.navigate(configUrl.concat("/",row.Title))




  }








}
