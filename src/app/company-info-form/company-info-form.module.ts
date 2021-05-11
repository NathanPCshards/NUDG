import { NgModule } from '@angular/core';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { CompanyInfoFormComponent } from './company-info-form.component';

@NgModule({
  declarations: [
      CompanyInfoFormComponent

    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      ],

    providers :[
      login
    ]

})
export class CompanyInfoModule { }
