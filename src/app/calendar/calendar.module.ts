import { NgModule } from '@angular/core';

import { SharedModule } from '../SharedModule.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    CalendarComponent

    
  ],
  imports: [
    SharedModule,
    
  ],
  exports : [      
    CalendarComponent
  ]
})
export class ControlModule { }
