import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { PolicyBoardComponent} from '../policy-board/policy-board.component'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { PolicyService } from '../services/policy.service';
import { policy } from '../models/policy';
import { taskService } from '../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})



export class DashboardComponent implements OnInit {
  showFiller = false;
  panelOpenState = false;
  displayedColumns: string[] = ['Title', 'Subtitle', 'Status'];
  
  rowSelected = false;
  name: any;
  viewDate: Date = new Date();

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  constructor(
    public policyService : PolicyService,
    public taskService : taskService,
    private _snackBar: MatSnackBar,

    ) { }


  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol'];


  //For parsing and counting which policies are implemented
  policyCount$: Observable<policy[]>;
  tasks$= []
  alerts$ = []
  implemented$ = 0;
  notImplemented$ = 0;
  deficient$ = 0;
  totalPolicies$ = 0;
  totalPossiblePoints$ = 0;
  currentPoints$ = 0;
  //variable used on alert box to be either "day" or "days" depending
  //on context, for grammar.
 
  

  ngOnInit() {    




    //pulling tasks from database
    this.taskService.fetchAll().subscribe(e=>{
      e.forEach(async element => {
        await this.triggerAlert(element)
        //conditional to show only events that have not happened yet
        if (daysTill(element.dateStart) >= 0){
          this.tasks$.push(element) 

        }
        //Sorting in ascending order, flip sign for reverse

        this.tasks$.sort(function(a, b){
          return daysTill(new Date(a.dateStart)) > daysTill(new Date(b.dateStart))  ? 1 : 0})
    
        })
   });



    //pulling every policy, checking its status and counting it
     this.policyCount$ = this.policyService.getAll().subscribe(e=>{
      let allPoliciesDict = []
      e.forEach(element => {
        allPoliciesDict.push(element) 
   });

   //iterating over policies and counting implemented status
    allPoliciesDict.forEach(element => {
      this.totalPolicies$ += 1
      if (element.NISTvalue){
          this.totalPossiblePoints$ += element.NISTvalue
      }    
      if (String(element.Pstatus)=="Implemented"){
        this.implemented$ += 1
        if (element.NISTvalue){
          this.currentPoints$ += element.NISTvalue
      } 
      }
      if (String(element.Pstatus)=="In Progress"){
        this.notImplemented$ += 1
      }
      if (String(element.Pstatus)=="Deficient"){
        this.deficient$ += 1
      }
    });

     });

  }

  convertDate(date,time){
    //converts ISO date format to mm/dd/yyyy, h:mm a
    //used for displaying date in 'upcoming tasks' box
    let tempDate = new Date(date)
    let tempTime = time.split(/[: ]/)
    let output: any

    if (String(tempTime[2]) == "PM"){
      let adjusted = Number(tempTime[0]) + 12
       output = new Date(tempDate.getFullYear(),tempDate.getMonth(), tempDate.getDate(), adjusted,Number(tempTime[1]),0,0 )
    }
    else{
       output = new Date(tempDate.getFullYear(),tempDate.getMonth(), tempDate.getDate(), Number(tempTime[0]),Number(tempTime[1]),0,0 )
    }
    let temp3 = [...output.toLocaleString()]
    temp3.splice(-6,3) //removing seconds from string

    return temp3.join('')
  }

  toDaysFunction(date){
    //helper function that calls daysTill
    return daysTill(new Date(date).getTime())
  }


  closeAlert(index){
    //removes alert from the array, which removes it from screen
    this.alerts$.splice(index,1)
  }

  triggerAlert(event){
      let alertSetting = event.alert
      let currentDate = new Date().getTime()
      let startDate = new Date(event.dateStart).getTime()
      //checks if alert is turned on. if it is, checks if the current date is within the alert range.
      if (alertSetting != "Off"){
        if (daysTill(startDate) < Number(alertSetting.split("")[0]) && daysTill(startDate) >= 0) {
          //by pushing into alerts, we add the event to a ngFor loop in the html, and a new alert shows up

          if (this.toDaysFunction(event.dateStart) == 1){
            event.isAre = "is"
            event.day = "Day"
          }else{
            event.isAre = "are"
            event.day = "Days"
          }
          
          this.alerts$.push(event)

        }
      }
      this.alerts$.sort(function(a, b){
        return a.dateStart > b.dateStart  ? 1 : 0})
      
  }

  getAllPolicies(): Observable<policy[]> {
    return this.policyService.getAll();
  }
  getImplementedPolicies(): Observable<policy[]> {
    return this.policyService.patch();
  }



}


@Component({
  selector: 'chart-simple',
  templateUrl: './chart1.html',
  styleUrls: ['./dashboard.component.scss']
})
export class chartSimple implements OnInit {
  options: any;
  constructor() {}

  ngOnInit(): void {
    const xAxisData = [] as any;
    const data1 = [] as any;
    const data2 = [] as any;

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      
      title: {
        text:'Graph Example',
        left:'center',
        top: 20,
        
        

      },
      legend: {
        data: ['bar', 'bar2'],
        x: 'center',
        y: 'bottom',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}



@Component({
  selector: '3d-chart',
  templateUrl: './3dChart.html',
  styleUrls: ['./dashboard.component.scss']
})
export class Bar3dDatasetComponent implements OnInit {
  options: Observable<any> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.options = this.http
      .get('assets/data/life-expectancy-table.json', { responseType: 'json' })
      .pipe(
        map((data) => ({
          grid3D: {},
          tooltip: {},
          xAxis3D: {
            type: 'category',
          },
          yAxis3D: {
            type: 'category',
          },
          zAxis3D: {},
          visualMap: {
            max: 1e8,
            dimension: 'Population',
          },
          dataset: {
            dimensions: [
              'Income',
              'Life Expectancy',
              'Population',
              'Country',
              { name: 'Year', type: 'ordinal' },
            ],
            source: data,
          },
          series: [
            {
              type: 'bar3D',
              // symbolSize: symbolSize,
              shading: 'lambert',
              encode: {
                x: 'Year',
                y: 'Country',
                z: 'Life Expectancy',
                tooltip: [0, 1, 2, 3, 4],
              },
            },
          ],
        })),
      );
  }
}
function dateDiffInDays(a, b) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// Calculate how many days between now and an event...
function daysTill(e) {
  var eventE = new Date(e);
  var today =  new Date();
  return dateDiffInDays(today, eventE);
}