import { NgModule } from '@angular/core';
import { milestoneDialog, MilestoneFormComponent } from '../milestone-form/milestone-form.component';
import { SharedModule } from '../SharedModule.module';
import { weaknessDialog, WeaknessFormComponent } from './weakness-form.component';

@NgModule({
  declarations: [

    WeaknessFormComponent,
    weaknessDialog,
    
    MilestoneFormComponent,
    milestoneDialog,
      

    
  ],
  imports: [
    SharedModule,
  ],
  providers: [

  ],
  exports : [      

    WeaknessFormComponent,
    weaknessDialog,
    MilestoneFormComponent,
    milestoneDialog,],

})
export class WeaknessModule { }
