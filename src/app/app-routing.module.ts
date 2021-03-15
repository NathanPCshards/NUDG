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
import { GroupFormComponent, groupTable } from './group-form/group-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { controlTable, IdentifierPageComponent, weaknessTable } from './identifier-page/identifier-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CuiContractsFormComponent } from './cui-contracts-form/cui-contracts-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { GuidelinesForm, GuidelinesPageComponent } from './guidelines-page/guidelines-page.component';
import { GapAssessmentPageComponent, GapForm } from './gap-assessment-page/gap-assessment-page.component';
import { weaknessDialog, WeaknessFormComponent } from './weakness-form/weakness-form.component';
import { controlDialog, ControlFormComponent } from './control-form/control-form.component';
import { NetworkSharesFormComponent, networkSharesPage } from './network-shares-form/network-shares-form.component';
import { SoftwareApprovalFormComponent } from './software-approval-form/software-approval-form.component';
import { SharedResourcesFormComponent } from './shared-resources-form/shared-resources-form.component';
import { SecurityLogFormComponent } from './security-log-form/security-log-form.component';
import { helpCenterForm } from './help-center/help-center.component';
import { ProcedureFormComponent } from './procedure-form/procedure-form.component';
import { MilestoneFormComponent } from './milestone-form/milestone-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
//https://angular.io/guide/router

const routes: Routes = [
  { path: 'Home', component: LoginFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'Policies', component: PolicyBoardComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Users', component: UserFormComponent },
  { path: 'Inventory', component: InventoryFormComponent },
  { path: 'CompanyInfo', component: CompanyInfoFormComponent },
  { path: 'Roles', component: RoleFormComponent },
  { path: 'GroupsForm', component: GroupFormComponent },
  { path: 'GroupsPage', component: groupTable },
  { path: 'AdminPanel', component: AdminPanelComponent },

  { path: 'Policy', component: IdentifierPageComponent },
  { path: 'AC-N.01', component: IdentifierPageComponent },
  { path: 'CUIcontracts', component: CuiContractsFormComponent },
  { path: 'Suppliers', component: SupplierFormComponent },
  { path: 'Vendors', component: VendorFormComponent },
  { path: 'Tasks', component: TasksComponent },
  { path: 'Controls', component: ControlFormComponent },
  { path: 'GuidelinesForm', component: GuidelinesPageComponent },
  { path: 'GuidelinesPage', component: GuidelinesForm },
  
  { path: 'Weaknesses', component: WeaknessFormComponent },
  { path: 'GapAssessment', component: GapAssessmentPageComponent },
  { path: 'GapForm', component: GapForm },
  { path: 'ControlForm', component: controlDialog },
  { path: 'WeaknessForm', component: weaknessDialog },
  { path: 'NetworkShareForm', component: NetworkSharesFormComponent },
  { path: 'NetworkSharePage', component: networkSharesPage},

  { path: 'SoftwareApprovalForm', component: SoftwareApprovalFormComponent },
  { path: 'SharedResourceForm', component: SharedResourcesFormComponent},
  { path: 'SecurityLogForm', component: SecurityLogFormComponent},
  { path: 'HelpCenterForm', component: helpCenterForm},

  { path: 'MilestonePage', component: MilestoneFormComponent},
  { path: 'ProcedurePage', component: ProcedureFormComponent},












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

