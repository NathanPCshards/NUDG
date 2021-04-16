import { NgModule }       from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModule } from '../app.module';
import { ControlFormComponent } from '../control-form/control-form.component';
import { ControlModule } from '../control-form/control.module';
import { FileImportComponent } from '../file-import/file-import.component';
import { fileImportModule } from '../file-import/file-import.module';
import { GapForm } from '../gap-assessment-page/gap-assessment-page.component';
import { GapModule } from '../gap-assessment-page/gap.module';
import { SharedModule } from '../SharedModule.module';
import { WeaknessModule } from '../weakness-form/weakness.module';
import { AccordionItemComponent } from './accordion-item.component';
//import { PolicyAccordionService } from '../services/policy-accordion.service';
import { PolicyAccordionComponent } from './policy-accordion.component';
 

@NgModule({
  imports: [
    SharedModule,
    ControlModule,
    WeaknessModule,
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
    ControlFormComponent,
    GapForm

  ],

})
export class PolicyAccordionModule {}

