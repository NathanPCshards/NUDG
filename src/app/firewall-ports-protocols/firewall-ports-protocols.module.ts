import { NgModule } from '@angular/core';
import { login } from '../injectables';

import { SharedModule } from '../SharedModule.module';
import { FirewallPortsProtocolsComponent } from './firewall-ports-protocols.component';


@NgModule({
  declarations: [


    FirewallPortsProtocolsComponent

    
  ],
  imports: [
    SharedModule,
  ],
  exports : [      


],
providers : [
  login
]

})
export class fileImportModule { }
