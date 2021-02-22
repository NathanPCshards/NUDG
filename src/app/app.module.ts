import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { CompanyInfoFormComponent } from './company-info-form/company-info-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { NotfoundComponent } from './notfound/notfound.component';

//Connections
import { HttpClientModule } from '@angular/common/http'

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
import { DialogElementsExampleDialog, UserFormComponent } from './user-form/user-form.component';
import { MatButtonModule } from '@angular/material/button';
import { GroupFormComponent } from './group-form/group-form.component';
import { roleDialog, RoleFormComponent } from './role-form/role-form.component';
import { IdentifierPageComponent } from './identifier-page/identifier-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PolicyBoardComponent } from './policy-board/policy-board.component';
import { AppRoutingModule } from './app-routing.module';

//Charts
import { ChartsModule} from 'ng2-charts';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
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
    MyLineChartComponent,
    DialogElementsExampleDialog,
    NotfoundComponent,
    roleDialog

    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    //Forms
    FormsModule,
    ReactiveFormsModule,

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
    ChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    

  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
