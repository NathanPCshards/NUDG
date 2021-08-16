import { NgModule } from '@angular/core';

import { SharedModule } from '../../SharedModule.module';
import { GapConfigComponent } from './gap-config.component';


@NgModule({
  declarations: [
    GapConfigComponent,
    


    
  ],
  imports: [
    SharedModule,
  ],
  exports : [  
    GapConfigComponent,
]
})
export class GapConfigModule { }
