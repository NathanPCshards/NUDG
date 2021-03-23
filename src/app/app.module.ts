import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//Forms and components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { CompanyInfoFormComponent } from './company-info-form/company-info-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { roleDialog, RoleFormComponent } from './role-form/role-form.component';
import { Bar3dDatasetComponent, calendarComponent, chartSimple, DashboardComponent } from './dashboard/dashboard.component';
import { PolicyBoardComponent } from './policy-board/policy-board.component';
import { UserFormComponent } from './user-form/user-form.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { CuiContractsFormComponent } from './cui-contracts-form/cui-contracts-form.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { TasksComponent } from './tasks/tasks.component';
import { GapAssessmentPageComponent, GapForm } from './gap-assessment-page/gap-assessment-page.component';

import {weaknessDialog, WeaknessFormComponent } from './weakness-form/weakness-form.component';
import { milestoneDialog, MilestoneFormComponent } from './milestone-form/milestone-form.component';
import { networkSharesPage } from './network-shares-form/network-shares-form.component';
import { SoftwareApprovalFormComponent } from './software-approval-form/software-approval-form.component';
import { SharedResourcesFormComponent } from './shared-resources-form/shared-resources-form.component';
import { SecurityLogFormComponent } from './security-log-form/security-log-form.component';
import { HelpCenterComponent, helpCenterForm } from './help-center/help-center.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


import {MatDatepickerModule} from '@angular/material/datepicker';



//Charts and calendars
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxEchartsModule } from 'ngx-echarts';
import { IdentifierPageModule } from './identifier-page/identifier-page.module';
import { SharedModule } from './SharedModule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PolicyAccordionModule } from './policy-accordion/policy-accordion.module';

@NgModule({
  declarations: [
    //Components
    AppComponent,
    LoginFormComponent,
    CompanyInfoFormComponent,
    InventoryFormComponent,
    UserFormComponent,
    GroupFormComponent,
    RoleFormComponent,
    DashboardComponent,
    PolicyBoardComponent,
    NotfoundComponent,
    roleDialog,
    chartSimple,
    Bar3dDatasetComponent,
    calendarComponent,
    VendorFormComponent,
    SupplierFormComponent,
    CuiContractsFormComponent,
    SupplierFormComponent,
    VendorFormComponent,
    TasksComponent,
    GapAssessmentPageComponent,
    GapForm,
    WeaknessFormComponent,
    weaknessDialog,
    MilestoneFormComponent,
    milestoneDialog,
    PageSearchComponent,
    SoftwareApprovalFormComponent,
    SharedResourcesFormComponent,
    SecurityLogFormComponent,
    HelpCenterComponent,
    helpCenterForm,
    networkSharesPage,
    AdminPanelComponent,

    

    
    
  ],
  imports: [
    IdentifierPageModule,
    SharedModule,
    PolicyAccordionModule,

    
    //charts
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    
    //calendar
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    
 

  ],
  exports : [],

  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
