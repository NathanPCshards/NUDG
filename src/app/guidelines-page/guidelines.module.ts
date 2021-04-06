import { NgModule } from '@angular/core';

import { SharedModule } from '../SharedModule.module';
import { guidelinesDialog, GuidelinesForm } from './guidelines-page.component';

@NgModule({
  declarations: [
      GuidelinesForm,
      guidelinesDialog
    
  ],
  imports: [

    SharedModule,
 
  ],
  exports : [      
    GuidelinesForm,
    guidelinesDialog

    ],

})
export class GuidelinesModule { }
