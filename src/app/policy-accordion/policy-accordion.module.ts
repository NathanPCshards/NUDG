import { NgModule }       from '@angular/core';
import { SharedModule } from '../SharedModule.module';
import { AccordionItemComponent } from './accordion-item.component';
//import { PolicyAccordionService } from '../services/policy-accordion.service';
import { PolicyAccordionComponent } from './policy-accordion.component';
 

@NgModule({
  imports: [
    SharedModule


  ],
  declarations: [
    PolicyAccordionComponent,
    AccordionItemComponent
  ],
  exports: [PolicyAccordionComponent, AccordionItemComponent],

})
export class PolicyAccordionModule {}


