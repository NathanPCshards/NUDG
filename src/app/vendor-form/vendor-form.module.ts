import { NgModule } from '@angular/core';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { VendorFormComponent } from './vendor-form.component';


@NgModule({
  declarations: [
      VendorFormComponent

    
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
