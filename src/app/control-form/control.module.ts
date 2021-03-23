import { NgModule } from '@angular/core';
import { controlTable } from '../identifier-page/identifier-page.component';
import { procedureDialog, ProcedureFormComponent } from '../procedure-form/procedure-form.component';

import { SharedModule } from '../SharedModule.module';
import { controlDialog, ControlFormComponent } from './control-form.component';

@NgModule({
  declarations: [
      ControlFormComponent,
      controlDialog,
      controlTable,
      ProcedureFormComponent,
      procedureDialog
      

    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      
    ControlFormComponent,
    controlDialog,
    controlTable,
    ProcedureFormComponent,
    procedureDialog],

})
export class ControlModule { }
