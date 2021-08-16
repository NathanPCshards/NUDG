import { NgModule } from '@angular/core';

import { SharedModule } from '../SharedModule.module';
import {  GapForm } from './gap-assessment-page.component';

@NgModule({
  declarations: [
    GapForm,


    
  ],
  imports: [
    SharedModule,
  ],
  exports : [  
    GapForm]
})
export class GapModule { }
