import { NgModule }       from '@angular/core';
import { SharedModule } from '../../SharedModule.module';
import { ControlModule } from '../../control-form/control.module';
import { PolicyAccordionModule } from '../../policy-accordion/policy-accordion.module';
import { fileImportModule } from '../../file-import/file-import.module';
import { myCalendarModule } from '../../calendar/calendar.module';
import { login } from '../../injectables';
import { GuidelinesModule } from 'src/app/guidelines-page/guidelines.module';
import { PolicyEditorComponent } from './policy-editor.component';
import { StandardModule } from 'src/app/standards-form/standards-form.module';
import { PolicyFormComponent } from '../policy-form/policy-form.component';

 

@NgModule({
  imports: [
    SharedModule,
    GuidelinesModule,
    PolicyAccordionModule,
    ControlModule,
    fileImportModule,
    myCalendarModule,
    StandardModule
 
  ],
  declarations: [
      PolicyEditorComponent,
      PolicyFormComponent
  ],
  providers : [
    login
  ],
  exports:[
    PolicyFormComponent
  ]

})
export class PolicyEditorModule {}


/* Not a known element checklist
These are the 5 steps I perform when I got such an error.

    Are you sure the name is correct? (also check the selector defined in the component)
    Declare the component in a module?
    If it is in another module, export the component?
    If it is in another module, import that module?
    Restart the cli?
*/