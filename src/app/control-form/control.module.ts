import { NgModule } from '@angular/core';
import { login } from '../injectables';
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
    providers :[
      login
    ]

})
export class ControlModule { }
