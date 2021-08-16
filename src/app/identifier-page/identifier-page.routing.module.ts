import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentifierPageComponent, } from './identifier-page.component';



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

