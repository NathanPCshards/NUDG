import { NgModule } from '@angular/core';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { StandardsFormComponent } from './standards-form.component';

@NgModule({
  declarations: [
      StandardsFormComponent,


    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      
    StandardsFormComponent,
],
    providers :[
      login
    ]

})
export class StandardModule { }
