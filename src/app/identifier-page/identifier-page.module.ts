import { NgModule }       from '@angular/core';
import { FormsModule, NgControlStatus }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
 
import { IdentifierPageRoutingModule } from './identifier-page.routing.module';
import { WeaknessFormComponent } from '../weakness-form/weakness-form.component';
import { controlTable, IdentifierPageComponent, standardTable, weaknessTable } from './identifier-page.component';
import { SharedModule } from '../SharedModule.module';
import { guidelinesDialog, GuidelinesForm } from '../guidelines-page/guidelines-page.component';
import { ControlFormComponent } from '../control-form/control-form.component';
import { AppModule } from '../app.module';
 

@NgModule({
  imports: [
    IdentifierPageRoutingModule,
    SharedModule
   // AppModule,

   // control
  ],
  declarations: [
    IdentifierPageComponent,
    weaknessTable,
    controlTable,
    standardTable,

   // ControlFormComponent,




  ]
})
export class IdentifierPageModule {}


