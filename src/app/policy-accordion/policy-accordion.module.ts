import { NgModule }       from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlModule } from '../control-form/control.module';
import { fileImportModule } from '../file-import/file-import.module';
import { GapForm } from '../gap-assessment-page/gap-assessment-page.component';
import { GapModule } from '../gap-assessment-page/gap.module';
import { SharedModule } from '../SharedModule.module';
import { StandardModule } from '../standards-form/standards-form.module';
import { WeaknessModule } from '../weakness-form/weakness.module';
import { AccordionItemComponent } from './accordion-item.component';
import { PolicyAccordionComponent } from './policy-accordion.component';
 

@NgModule({
  imports: [
    SharedModule,
    ControlModule,
    WeaknessModule,
    StandardModule,
    fileImportModule,
    GapModule

  ],
  declarations: [
    PolicyAccordionComponent,
    AccordionItemComponent,



  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
],
  exports: [
    PolicyAccordionComponent, 
    AccordionItemComponent,
    GapForm

  ],

})
export class PolicyAccordionModule {}

