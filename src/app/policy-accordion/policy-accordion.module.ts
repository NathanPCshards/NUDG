import { NgModule }       from '@angular/core';
import { AppModule } from '../app.module';
import { ControlFormComponent } from '../control-form/control-form.component';
import { ControlModule } from '../control-form/control.module';
import { SharedModule } from '../SharedModule.module';
import { WeaknessModule } from '../weakness-form/weakness.module';
import { AccordionItemComponent } from './accordion-item.component';
//import { PolicyAccordionService } from '../services/policy-accordion.service';
import { PolicyAccordionComponent } from './policy-accordion.component';
 

@NgModule({
  imports: [
    SharedModule,
    ControlModule,
    WeaknessModule


  ],
  declarations: [
    PolicyAccordionComponent,
    AccordionItemComponent,


  ],
  exports: [
    PolicyAccordionComponent, 
    AccordionItemComponent,
    ControlFormComponent,

  ],

})
export class PolicyAccordionModule {}

