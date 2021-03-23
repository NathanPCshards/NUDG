import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent implements OnInit {
  myControl = new FormControl();
  filteredPages: Observable<any[]>;
  toHighlight: string = '';
  input = document.querySelector('input')!;
  log = document.getElementById('values')!;

  //As long as these match a path in app-routing.module.ts
  //your good to go.
  
  options: string[] = [
  'CUIcontracts', 'Home', 'Policies',
  'Dashboard', 'Users', 'Inventory',
  'CompanyInfo', 'Roles', 'Accordion',
  'Suppliers', 'Vendors', 'Tasks',
  'Controls', 'Weaknesses',
  'GapAssessment', 'GapForm', 'ControlForm',
  'WeaknessForm', 'SoftwareApprovalForm',
  'SharedResourceForm', 'SecurityLogForm', 'GuidelinesPage',
  'HelpCenterForm', 'GroupsPage',
  'NetworkSharePage','MilestonePage', 'ProcedurePage','AdminPanel'];

  
  constructor(private route : ActivatedRoute, private router:Router) {
    //this.input.addEventListener('input', this.updateValue);
    this.options.sort();

    this.myControl = new FormControl();
    this.filteredPages = this.myControl.valueChanges
      .pipe(
        startWith(''),
        //@ts-ignore
        map(page => page ? this.filteredPages(page) : this.options.slice())
      );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options.filter(page => this._normalizeValue(page).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  ngOnInit(): void {
    this.filteredPages = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  public handleKeyDown(event: any, page : any)
  {
    
     console.log("Event: " , event);
    // console.log("Page : " , page)
      if (event.key == "Enter")
      {
        this.router.navigate([page], { relativeTo: this.route });
        }      

  }
 

}


