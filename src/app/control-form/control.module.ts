import { NgModule } from '@angular/core';
import { procedureDialog, ProcedureFormComponent } from '../procedure-form/procedure-form.component';

import { SharedModule } from '../SharedModule.module';
import { controlDialog, ControlFormComponent } from './control-form.component';

@NgModule({
  declarations: [
      ControlFormComponent,
      controlDialog,
      ProcedureFormComponent,
      procedureDialog,

    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      
    ControlFormComponent,
    controlDialog,
    ProcedureFormComponent,
    procedureDialog],

})
export class ControlModule { }
