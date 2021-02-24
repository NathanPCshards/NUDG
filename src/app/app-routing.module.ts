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
import { IdentifierPageComponent } from './identifier-page/identifier-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
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

  { path: '404', component: NotfoundComponent},
  /*{ path: '**', redirectTo: '/404'},*/
  

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

