import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { PolicyBoardComponent } from './policy-board/policy-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { CompanyInfoFormComponent } from './company-info-form/company-info-form.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { IdentifierPageComponent,  } from './identifier-page/identifier-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CuiContractsFormComponent } from './cui-contracts-form/cui-contracts-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';

import { GuidelinesForm } from './guidelines-page/guidelines-page.component';
import { GapForm } from './gap-assessment-page/gap-assessment-page.component';
import { weaknessDialog } from './weakness-form/weakness-form.component';
import { controlDialog  } from './control-form/control-form.component';
import { networkSharesPage } from './network-shares-form/network-shares-form.component';
import { SoftwareApprovalFormComponent } from './software-approval-form/software-approval-form.component';
import { SharedResourcesFormComponent } from './shared-resources-form/shared-resources-form.component';
import { SecurityLogFormComponent } from './security-log-form/security-log-form.component';
import { helpCenterForm } from './help-center/help-center.component';
import { ProcedureFormComponent } from './procedure-form/procedure-form.component';
import { MilestoneFormComponent } from './milestone-form/milestone-form.component';
import { AdminPanelComponent } from '../app/adminPanel/admin-panel/admin-panel.component';

import { PolicyAccordionComponent } from './policy-accordion/policy-accordion.component';
import { FileImportComponent } from './file-import/file-import.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FirewallPortsProtocolsComponent } from './firewall-ports-protocols/firewall-ports-protocols.component';
import { POAMComponent } from './poam/poam.component';
import { StandardsFormComponent } from './standards-form/standards-form.component';
import { AccountPageComponent } from './adminPanel/account-page/account-page.component';
import { PersonalizationComponent } from './adminPanel/personalization/personalization.component';
import { PaymentPageComponent } from './adminPanel/payment-page/payment-page.component';
import { PersonalInfoComponent } from './adminPanel/personal-info/personal-info.component';
import { ChangeNameFormComponent } from './changeNameForm/change-name-form/change-name-form.component';
import { ChangePhoneFormComponent } from './changePhoneForm/change-phone-form/change-phone-form.component';
import { ChangeEmailFormComponent } from './changeEmailForm/change-email-form/change-email-form.component';
import { ChangePasswordFormComponent } from './changePasswordForm/change-password-form/change-password-form.component';
import { PolicyEditorComponent } from './adminPanel/policy-editor/policy-editor.component';
import { GapConfigComponent } from './adminPanel/GapConfig/gap-config.component';
//https://angular.io/guide/router

const routes: Routes = [
  { path: 'Home', component: LoginFormComponent },
  { path: 'Register', component: RegisterFormComponent },

  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  { path: 'Policies', component: PolicyBoardComponent },
  { path: 'Policies/:type', component: PolicyBoardComponent },

  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Users', component: UserFormComponent },
  { path: 'Inventory', component: InventoryFormComponent },
  { path: 'CompanyInfo', component: CompanyInfoFormComponent },
  { path: 'Roles', component: RoleFormComponent },
  { path: 'GroupsPage', component: GroupFormComponent },

  { path: 'AdminPanel', component: AdminPanelComponent, },

  {path:'PolicyEditor/:id/:date', component: PolicyEditorComponent},

  { path: 'Accordion', component: PolicyAccordionComponent },
  { path: 'Policy', component: IdentifierPageComponent},
  { path: 'Policy/:id', component: IdentifierPageComponent },
  { path: 'Policy/:id/:Date', component: IdentifierPageComponent },
  { path: 'Firewall', component: FirewallPortsProtocolsComponent },
  { path: 'POAM', component: POAMComponent },
  { path: 'Standards', component: StandardsFormComponent },
  { path: 'Account', component: AccountPageComponent },
  { path: 'Personalization', component: PersonalizationComponent },
  { path: 'Payment', component: PaymentPageComponent },
  { path: 'PersonalInfo', component: PersonalInfoComponent },
  { path: 'ChangeName', component: ChangeNameFormComponent },
  { path: 'ChangePhone', component: ChangePhoneFormComponent },
  { path: 'ChangeEmail', component: ChangeEmailFormComponent },
  { path: 'ChangePassword', component: ChangePasswordFormComponent },
  { path: 'GapConfig', component: GapConfigComponent },


  { path: 'Calendar', component: CalendarComponent },

  { path: 'CUIcontracts', component: CuiContractsFormComponent },
  { path: 'Suppliers', component: SupplierFormComponent },
  { path: 'Vendors', component: VendorFormComponent },

  { path: 'GuidelinesPage', component: GuidelinesForm },
  
  { path: 'GapForm', component: GapForm },
  { path: 'GapForm/:id/:Date', component: GapForm },

  { path: 'ControlForm', component: controlDialog },
  { path: 'WeaknessForm', component: weaknessDialog },
  { path: 'NetworkSharePage', component: networkSharesPage},

  { path: 'SoftwareApprovalForm', component: SoftwareApprovalFormComponent },
  { path: 'SharedResourceForm', component: SharedResourcesFormComponent},
  { path: 'SecurityLogForm', component: SecurityLogFormComponent},
  { path: 'HelpCenterForm', component: helpCenterForm},

  { path: 'MilestonePage', component: MilestoneFormComponent},
  { path: 'ProcedurePage', component: ProcedureFormComponent},
  { path: 'FileDrop', component: FileImportComponent},

  { path: '404', component: NotfoundComponent},
 // { path: '**', redirectTo: '/404'},
  //occasionally disabled while testing

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
export class AppRoutingModule { 


}

