import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    CalendarComponent

    
  ],
  imports: [
    SharedModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    
    
  ],
  exports : [      
    CalendarComponent
  ],
  providers : [
    login
  ]
})
export class myCalendarModule { }
