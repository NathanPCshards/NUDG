import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentifierPageComponent, standardTable } from './identifier-page.component';
import { ControlFormComponent } from '../control-form/control-form.component';
import { WeaknessFormComponent } from '../weakness-form/weakness-form.component';


const identifierPageRoutes: Routes = [
    {
        path: 'Policy',
        component: IdentifierPageComponent,
        //redirectTo: 'Policy/controls',
        children: [
          {
            path: 'standards',
            component: standardTable,
            outlet: 'sub'
          },
    
        {
            path: 'Policy/controls',
            component: ControlFormComponent,
            outlet: 'sub'
    
        },
        {
            path: 'controls',
            component: WeaknessFormComponent,
            outlet: 'sub'
    
        }
        ]
    },
      
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

