import { NgModule }       from '@angular/core';
import { IdentifierPageRoutingModule } from './identifier-page.routing.module';

import {  IdentifierPageComponent, } from './identifier-page.component';
import { SharedModule } from '../SharedModule.module';

import { GuidelinesModule } from '../guidelines-page/guidelines.module';
import { ControlModule } from '../control-form/control.module';
import { PolicyAccordionModule } from '../policy-accordion/policy-accordion.module';
import { fileImportModule } from '../file-import/file-import.module';
import { myCalendarModule } from '../calendar/calendar.module';

 

@NgModule({
  imports: [
    IdentifierPageRoutingModule,
    SharedModule,
    GuidelinesModule,
    PolicyAccordionModule,
    ControlModule,
    fileImportModule,
    myCalendarModule

 
  ],
  declarations: [
    IdentifierPageComponent,
    




  ]
})
export class IdentifierPageModule {}


