import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';







@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.scss']
})
export class AdminPanelComponent implements OnInit {
  submitted = false;
  idPage;
  results;
  panelOpenState;
  displayedColumns: string[] = ['Title', 'Subtitle', 'Status'];
  rowSelected = false;
  name: any;


  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.idPage = this.formBuilder.group({
      //initialize some stuff here
    });
  }


  onRowClicked(row): void {
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
   // this.router.navigate(configUrl.concat("/",row.Title))
  }




}



