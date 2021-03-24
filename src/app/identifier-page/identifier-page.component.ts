import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { standards } from '../models/standards';
import { weaknesses } from '../models/weaknesses';
import { ControlsService } from '../services/controls.service';
import { SharedService } from '../services/Shared';
import { StandardsService } from '../services/standards.service';
import { WeaknessesService } from '../services/weaknesses.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PolicyAccordionService } from '../services/policy-accordion.service';

//leave for now. The accordion needs these to function
const obj = {
  title: '',
  description: ''
}
const accordionEntries: any[] = [];
for (let i = 0; i < 1; i++) {
  accordionEntries.push(obj);
}


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
  rowSelected = false;
  name: any;
  entries: any[];  

  //service variables


  //accordion animation variables
  grow;
  shrink;
  uncollapsed = false;
  collapse = true;

  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private router:Router, 
    private route: ActivatedRoute,
    private service:PolicyAccordionService,
    private weaknessservice: WeaknessesService) { }

  ngOnInit(){
    this.entries = accordionEntries
    //theres some issue here with content not loading look into it...
    document.getElementById('control').className = 'control2'
    document.getElementById('weakness').className = 'weakness2'
    document.getElementById('standard').className = 'standard2'
    document.getElementById('policy').className = 'policy2'

    this.service.onAccordionClick.subscribe(data =>{
      if (data == "shrink"){

       console.log("small")
       this.uncollapsed = true;

      document.getElementById('control').className = 'control'
      document.getElementById('standard').className = 'standard'
      document.getElementById('weakness').className = 'weakness'


      document.getElementById('policy').className = 'policy'


      }
      if (data == "grow"){
        console.log("grow")
         this.uncollapsed = false;

        document.getElementById('weakness').className = 'weakness2'
        document.getElementById('control').className = 'control2'
        document.getElementById('policy').className = 'policy2'
        document.getElementById('standard').className = 'standard2'


      }

    });

    this.idPage = this.formBuilder.group({
      //initialize some stuff here
    });
  }
  fetchAllWeaknesses(): Observable<weaknesses[]> {
    return this.weaknessservice.fetchAll();
  }

  onRowClicked(row): void {
    console.log("Row clicked: ", row);
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
    console.log(configUrl)
   // this.router.navigate(configUrl.concat("/",row.Title))
  }

}



//weaknesses
//controls
//standards


@Component({
  selector: 'weaknessTable',
  templateUrl: 'weaknessTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class weaknessTable {
  weaknesses$: Observable<weaknesses[]>;

@ViewChild(MatSort) sort;

clickEventsubscription;
displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private sharedService: SharedService, private weaknessService:WeaknessesService) { 
/*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){
  this.weaknesses$ = this.fetchAll();

}
ngAfterViewInit(){

}
fetchAll(): Observable<weaknesses[]> {
  return this.weaknessService.fetchAll();
}

update(id: number, inventoryItem: Partial<weaknesses>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;
/*
  const newWeakness: weaknesses = {
    id,
    name

  };

  this.weaknesses$ = this.weaknessService
    .update(newWeakness)
    .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));*/
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.weaknesses$ = this.weaknessService
    .delete(id)
    .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));
    
}


}

@Component({
  selector: 'controlTable',
  templateUrl: 'controlTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class controlTable {

controls$: Observable<controls[]>;

@ViewChild(MatSort) sort;

clickEventsubscription;

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private sharedService: SharedService, private controlsService : ControlsService) { 
/*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){
  this.controls$ = this.fetchAll();

}
ngAfterViewInit(){
}

fetchAll(): Observable<controls[]> {
  return this.controlsService.fetchAll();
}

post(inventoryItem: Partial<controls>): void {
  const name = (<string>inventoryItem).trim();
  if (!name) return;

///  this.controls$ = this.controlsService
  //  .post({ name })
 //   .pipe(tap(() => (this.controls$ = this.fetchAll())));
}


update(id: number, inventoryItem: Partial<controls>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;

 // const newUsers: controls = {
 //   id,
  //  name

 // };

  //this.controls$ = this.controlsService
   // .update(newUsers)
  //  .pipe(tap(() => (this.controls$ = this.fetchAll())));
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.controls$ = this.controlsService
    .delete(id)
    .pipe(tap(() => (this.controls$ = this.fetchAll())));
    
}

}

@Component({
  selector: 'standardTable',
  templateUrl: 'standardTable.html',
  styleUrls: ['./identifier-page.component.scss']

})
export class standardTable {

@ViewChild(MatSort) sort;
standards$: Observable<standards[]>;

//clickEventsubscription;
//displayedColumns: string[] = ['id', 'desc'];

rowSelected = false;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, 
    private sharedService: SharedService, private standardsService : StandardsService) { 
/*
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.removeSelectedRows();
      })*/

  }

ngOnInit(){
  this.standards$ = this.fetchAll();

}
ngAfterViewInit(){

}
fetchAll(): Observable<standards[]> {
  return this.standardsService.fetchAll();
}

post(standardEntry: Partial<standards>): void {
  const Standard = (<string>standardEntry).trim();
  if (!Standard) return;

  this.standards$ = this.standardsService
    .post({ Standard })
    .pipe(tap(() => (this.standards$ = this.fetchAll())));
}


update(id: number, inventoryItem: Partial<standards>): void {
  const name = (<any>inventoryItem).trim();
  
  if (!name) return;
/*
  const newUsers: standards = {
    id,
    name

  };

  this.standards$ = this.standardsService
    .update(newUsers)
    .pipe(tap(() => (this.standards$ = this.fetchAll())));*/
}


delete(id: any): void {
  console.log("attempting to delete id : " , id)
 // iduseru = 15
 // console.log("attempting to delete id : " , iduseru)

  this.standards$ = this.standardsService
    .delete(id)
    .pipe(tap(() => (this.standards$ = this.fetchAll())));
    
}

}
