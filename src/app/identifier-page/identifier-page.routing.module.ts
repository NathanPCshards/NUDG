import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentifierPageComponent, } from './identifier-page.component';
import { ControlFormComponent } from '../control-form/control-form.component';
import { WeaknessFormComponent } from '../weakness-form/weakness-form.component';


const identifierPageRoutes: Routes = [
    {
        path: 'Policy',
        component: IdentifierPageComponent,
        //redirectTo: 'Policy/controls',
    }
      
];

@NgModule({
  imports: [
    RouterModule.forChild(identifierPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IdentifierPageRoutingModule { }

