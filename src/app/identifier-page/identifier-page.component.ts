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
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MilestoneFormComponent } from '../milestone-form/milestone-form.component';
import { ProcedureFormComponent } from '../procedure-form/procedure-form.component';
import { MatTableDataSource } from '@angular/material/table';

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
  controlDrop
  weaknessDrop;
  submitted = false;
  //accordion animation variables
  entries: any[]; 
  grow;
  shrink;
  uncollapsed = false;
  collapse = true;
  //Database obeservables
  weaknesses$: Observable<weaknesses[]>;
  controls$: Observable<controls[]>;
  standards$: Observable<standards[]>;
  //Used for sorting
  weaknessesDataSource;

  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private router:Router, 
    private route: ActivatedRoute,
    private service:PolicyAccordionService,
    private weaknessservice: WeaknessesService,
    private controlsservice: ControlsService,
    private standardsservice: StandardsService,
    public dialog : MatDialog
    ) { }

  ngOnInit(){
    //ACCORDION STUFF
    this.entries = accordionEntries

    this.service.onAccordionClick.subscribe(data =>{
      if (data == "shrink"){

       console.log("small")
       this.uncollapsed = true;

      console.log(document.getElementById("control").className)
      console.log(document.getElementById("standard3").className)

      document.getElementById('control').className = 'Cshrink'
      document.getElementById('standard3').className = 'Sshrink'
      document.getElementById('weakness').className = 'Wshrink'
      document.getElementById('policy').className = 'Pshrink'
      console.log(document.getElementById("control").className)
      console.log(document.getElementById("standard3").className)

      }
      if (data == "grow"){
        console.log("grow")
         this.uncollapsed = false;

        document.getElementById('weakness').className = 'Wgrow'
        document.getElementById('control').className = 'Cgrow'
        document.getElementById('policy').className = 'Pgrow'
        document.getElementById('standard3').className = 'Sgrow'


      }

    });
    //CONTROLS STUFF
    this.controls$ = this.fetchAllControls();
    this.controlsservice.onClick.subscribe(data =>{
      console.log("submit should have been clicked")
      console.log("data : " , data)
      
      this.controls$ = this.controlsservice
      .post(data)
      .pipe(tap(() => (this.controls$ = this.fetchAllControls())));
    });
  
    //WEAKNESSES STUFF
    this.weaknesses$ = this.fetchAllWeaknesses();
    this.weaknessservice.onClick.subscribe(data =>{
      console.log("submit should have been clicked")
      console.log("data : " , data)
      
      this.weaknesses$ = this.weaknessservice
      .post(data)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses())));
  
      
  });
    //STANDARDS STUFF
    this.standards$ = this.fetchAllStandards();



  }
  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.weaknessesDataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchAllControls(): Observable<controls[]> {
    return this.controlsservice.fetchAll();
  }
  updateControls(id: number, inventoryItem: Partial<controls>): void {
    //this.controls$ = this.controlsService
     // .update(newUsers)
    //  .pipe(tap(() => (this.controls$ = this.fetchAll())));
  }
  deleteControls(id: any): void {
    this.controls$ = this.controlsservice
      .delete(id)
      .pipe(tap(() => (this.controls$ = this.fetchAllControls())));
      
  }
  



  fetchAllWeaknesses(): Observable<weaknesses[]> {
    return this.weaknessservice.fetchAll();
  }
  updateWeaknesses(id: number, inventoryItem: Partial<weaknesses>): void {
  /*
    this.weaknesses$ = this.weaknessService
      .update(newWeakness)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAll())));*/
  }
  deleteWeaknesses(id: any): void {
    this.weaknesses$ = this.weaknessservice
      .delete(id)
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses())));
      
  }





  fetchAllStandards(): Observable<standards[]> {
    return this.standardsservice.fetchAll();
  }
  postStandards(standardEntry: Partial<standards>): void {
    const Standard = (<string>standardEntry).trim();
    if (!Standard) return;
  
    this.standards$ = this.standardsservice
      .post({ Standard })
      .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
  }
  updateStandards(id: number, inventoryItem: Partial<standards>): void {
  /*
    this.standards$ = this.standardsService
      .update(newUsers)
      .pipe(tap(() => (this.standards$ = this.fetchAll())));*/
  }
  deleteStandards(id: any): void {
    this.standards$ = this.standardsservice
      .delete(id)
      .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
      
  }


  drop(event: CdkDragDrop<string[]>) {

      let WcompletionDate = String(new Date());
      let Wstatus = "Good"
      let Nid = event.item.data.Nid
      this.weaknesses$ = this.weaknessservice
      .patch({WcompletionDate, Wstatus, Nid })
      .pipe(tap(() => (this.weaknesses$ = this.fetchAllWeaknesses())));


    //double check on this
    if (event.previousContainer === event.container) {
      //if object does NOT change containers
    } else {
      //if object changes containers
      console.log(event.previousContainer.data)
    }


  }





//must return true to call Drop().
  controlsToWeaknesses(item: CdkDrag<any>) {
    //this.dragdrop.emit(item.data)
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  weaknessesToControls(item: CdkDrag<any>) {
   // this.dragdrop.emit(item.data)
    return true;
  }



  openMilestones(idOrgWeaknesses){
    let dialogRef = this.dialog.open(MilestoneFormComponent, {
      width: '2400px',
      height: '800px',
      autoFocus : false,
      data: {
        idOrgWeaknesses
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);//returns undefined
    });


  }

  openProcedures(idOrgControls){
    let dialogRef = this.dialog.open(ProcedureFormComponent, {
      width: '2400px',
      height: '800px',
      autoFocus : false,
      data: {
        idOrgControls
      },

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);//returns undefined
    });


  }




}




