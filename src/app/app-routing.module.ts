import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PolicyBoardComponent } from './policy-board/policy-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { CompanyInfoFormComponent } from './company-info-form/company-info-form.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { controlTable, IdentifierPageComponent, weaknessTable } from './identifier-page/identifier-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CuiContractsFormComponent } from './cui-contracts-form/cui-contracts-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { GuidelinesPageComponent } from './guidelines-page/guidelines-page.component';
import { GapAssessmentPageComponent, GapForm } from './gap-assessment-page/gap-assessment-page.component';
//https://angular.io/guide/router

const routes: Routes = [
  { path: 'home', component: LoginFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'Policies', component: PolicyBoardComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Users', component: UserFormComponent },
  { path: 'Inventory', component: InventoryFormComponent },
  { path: 'CompanyInfo', component: CompanyInfoFormComponent },
  { path: 'Roles', component: RoleFormComponent },
  { path: 'Groups', component: GroupFormComponent },
  { path: 'Policy', component: IdentifierPageComponent },
  { path: 'AC-N.01', component: IdentifierPageComponent },
  { path: 'CUIcontracts', component: CuiContractsFormComponent },
  { path: 'Suppliers', component: SupplierFormComponent },
  { path: 'Vendors', component: VendorFormComponent },
  { path: 'Tasks', component: TasksComponent },
  { path: 'Controls', component: controlTable },
  { path: 'Guidelines', component: GuidelinesPageComponent },
  { path: 'Weaknesses', component: weaknessTable },
  { path: 'GapAssessment', component: GapAssessmentPageComponent },
  { path: 'GapForm', component: GapForm },






  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'},
  

];

@NgModule({
  declarations: [],
  imports: [   
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

