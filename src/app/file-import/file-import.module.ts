import { NgModule } from '@angular/core';
import { DragDropDirective } from '../drag-drop.directive';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { FileImportComponent } from './file-import.component';

@NgModule({
  declarations: [
    FileImportComponent,
    DragDropDirective,


    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      
    FileImportComponent,
    DragDropDirective,

],
providers : [
  login
]

})
export class fileImportModule { }
