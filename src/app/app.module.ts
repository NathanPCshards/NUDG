import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//Forms and components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { CompanyInfoFormComponent } from './company-info-form/company-info-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GroupFormComponent, groupTable } from './group-form/group-form.component';
import { roleDialog, RoleFormComponent } from './role-form/role-form.component';
import { controlTable, IdentifierPageComponent, standardTable, weaknessTable } from './identifier-page/identifier-page.component';
import { Bar3dDatasetComponent, calendarComponent, chartSimple, DashboardComponent } from './dashboard/dashboard.component';
import { PolicyBoardComponent } from './policy-board/policy-board.component';
import { DialogElementsExampleDialog, UserFormComponent } from './user-form/user-form.component';
import { DialogVendor, VendorFormComponent } from './vendor-form/vendor-form.component';
import { DialogSupplier, SupplierFormComponent } from './supplier-form/supplier-form.component';
import { CuiContractsFormComponent, DialogCUIForm } from './cui-contracts-form/cui-contracts-form.component';
import { PageSearchComponent } from './page-search/page-search.component';


//Connections
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';


//Charts and calendars
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TasksComponent } from './tasks/tasks.component';
import { GapAssessmentPageComponent, GapForm } from './gap-assessment-page/gap-assessment-page.component';
import { GuidelinesForm, GuidelinesPageComponent } from './guidelines-page/guidelines-page.component';
import { controlDialog, ControlFormComponent } from './control-form/control-form.component';
import {weaknessDialog, WeaknessFormComponent } from './weakness-form/weakness-form.component';
import { milestoneDialog, MilestoneFormComponent } from './milestone-form/milestone-form.component';
import { procedureDialog, ProcedureFormComponent } from './procedure-form/procedure-form.component';
import { NetworkSharesFormComponent } from './network-shares-form/network-shares-form.component';
import { SoftwareApprovalFormComponent } from './software-approval-form/software-approval-form.component';
import { SharedResourcesFormComponent } from './shared-resources-form/shared-resources-form.component';
import { SecurityLogFormComponent } from './security-log-form/security-log-form.component';




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
    IdentifierPageComponent,
    DashboardComponent,
    PolicyBoardComponent,
    DialogElementsExampleDialog,
    NotfoundComponent,
    roleDialog,
    groupTable,
    weaknessTable,
    controlTable,
    standardTable,
    chartSimple,
    Bar3dDatasetComponent,
    calendarComponent,
    VendorFormComponent,
    SupplierFormComponent,
    CuiContractsFormComponent,
    DialogCUIForm,
    SupplierFormComponent,
    DialogSupplier,
    VendorFormComponent,
    DialogVendor,
    TasksComponent,
    GapAssessmentPageComponent,
    GuidelinesPageComponent,
    GapForm,
    ControlFormComponent,
    WeaknessFormComponent,
    weaknessDialog,
    controlDialog,
    ControlFormComponent,
    MilestoneFormComponent,
    milestoneDialog,
    ProcedureFormComponent,
    procedureDialog,
    PageSearchComponent,
    NetworkSharesFormComponent,
    SoftwareApprovalFormComponent,
    SharedResourcesFormComponent,
    SecurityLogFormComponent,
    GuidelinesForm,
    GuidelinesPageComponent,

    
    

    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModalModule,

    //Forms
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,

    //Connections
    HttpClientModule,
    AppRoutingModule,

    //All Material modules
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    
    
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
    
 

  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
