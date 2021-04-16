import { NgModule } from '@angular/core';
import { procedureDialog, ProcedureFormComponent } from '../procedure-form/procedure-form.component';

import { SharedModule } from '../SharedModule.module';
import { GapAssessmentPageComponent, GapForm } from './gap-assessment-page.component';

@NgModule({
  declarations: [
    GapForm,
    GapAssessmentPageComponent,


    
  ],
  imports: [
    SharedModule,
  ],
  exports : [  
    GapAssessmentPageComponent,    
    GapForm]
})
export class GapModule { }
