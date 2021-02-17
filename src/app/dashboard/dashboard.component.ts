import { Component, OnInit } from '@angular/core';
import { PolicyBoardComponent} from '../policy-board/policy-board.component'
export interface PeriodicElement {
  Subtitle: string;
  Title: string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Title: "AC-N.01", Subtitle: 'Account Management', Status: "Implemented"},
  {Title: "AC-N.02", Subtitle: 'Access Enforcement', Status: "Implemented", },
  {Title: "AC-N.03", Subtitle: 'Use of External Information Systems', Status: "Implemented"},
  {Title: "AC-N.04", Subtitle: 'Publicly Accessible Content', Status: "Implemented"},
  {Title: "AC-N.05", Subtitle: 'System Use Notification', Status: "Not Implemented"},
  {Title: "AC-N.06", Subtitle: 'Account Management', Status: "Implemented"},
  {Title: "AC-N.07", Subtitle: 'Access Enforcement', Status: "Implemented", },
  {Title: "AC-N.08", Subtitle: 'Use of External Information Systems', Status: "Implemented"},
  {Title: "AC-N.09", Subtitle: 'Publicly Accessible Content', Status: "Implemented"},
  {Title: "AC-N.10", Subtitle: 'System Use Notification', Status: "Not Implemented"},
  {Title: "AC-N.11", Subtitle: 'Account Management', Status: "Implemented"},
  {Title: "AC-N.12", Subtitle: 'Access Enforcement', Status: "Implemented", },
  {Title: "AC-N.13", Subtitle: 'Use of External Information Systems', Status: "Implemented"},
  {Title: "AC-N.14", Subtitle: 'Publicly Accessible Content', Status: "Implemented"},
  {Title: "AC-N.15", Subtitle: 'System Use Notification', Status: "Not Implemented"},
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
  dataSource = ELEMENT_DATA;
  rowSelected = false;
  name: any;
  constructor() { }

  ngOnInit() {
    
  }
  onRowClicked(row): void {
    console.log("Row clicked: ", row);
    this.rowSelected = true;
    var configUrl = 'http://localhost:4200' + "/" + row.Title;
    console.log(configUrl)
   // this.router.navigate(configUrl.concat("/",row.Title))




  }
}


