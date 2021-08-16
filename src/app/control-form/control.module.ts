import { NgModule } from '@angular/core';
import { login } from '../injectables';
import { procedureDialog, ProcedureFormComponent } from '../procedure-form/procedure-form.component';

import { SharedModule } from '../SharedModule.module';
import { controlDialog  } from './control-form.component';

@NgModule({
  declarations: [
      controlDialog,
      ProcedureFormComponent,
      procedureDialog,

    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      
    controlDialog,
    ProcedureFormComponent,
    procedureDialog],
    providers :[
      login
    ]

})
export class ControlModule { }
