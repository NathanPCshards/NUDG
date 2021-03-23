import { NgModule }       from '@angular/core';
import { IdentifierPageRoutingModule } from './identifier-page.routing.module';

import { IdentifierPageComponent, standardTable, weaknessTable } from './identifier-page.component';
import { SharedModule } from '../SharedModule.module';

import { GuidelinesModule } from '../guidelines-page/guidelines.module';
import { ControlModule } from '../control-form/control.module';
import { PolicyAccordionModule } from '../policy-accordion/policy-accordion.module';
 

@NgModule({
  imports: [
    IdentifierPageRoutingModule,
    SharedModule,
    GuidelinesModule,
    ControlModule,
    PolicyAccordionModule

   // AppModule,

   // control
  ],
  declarations: [
    IdentifierPageComponent,
    weaknessTable,
    
    standardTable,

   // ControlFormComponent,




  ]
})
export class IdentifierPageModule {}


