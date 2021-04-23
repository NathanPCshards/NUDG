import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { PolicyBoardComponent} from '../policy-board/policy-board.component'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { PolicyService } from '../services/policy.service';
import { policy } from '../models/policy';



// table stuff for examples -->
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];









@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
  constructor(public policyService : PolicyService) { }

  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  //For parsing and counting which policies are implemented
  policyCount$: Observable<policy[]>;
  implemented$ = 0;
  notImplemented$ = 0;
  deficient$ = 0;
  totalPolicies$ = 0;
  totalPossiblePoints$ = 0;
  currentPoints$ = 0;

  ngOnInit() {    
    //pulling every policy, checking its status and counting it
     this.policyCount$ = this.policyService.getAll().subscribe(e=>{
      let allPoliciesDict = []
      e.forEach(element => {
        allPoliciesDict.push(element) 
   });

   
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
  onRowClicked(row): void {
    console.log("Row clicked: ", row);
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
    console.log(configUrl)
   // this.router.navigate(configUrl.concat("/",row.Title))
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
