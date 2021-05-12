import { NgModule } from '@angular/core';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { CuiContractsFormComponent } from './cui-contracts-form.component';

@NgModule({
  declarations: [
      CuiContractsFormComponent

    
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
