import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { login } from './injectables';
import { ControlsService } from './services/controls.service';
import { GapService } from './services/gap.service';
import { restAPI } from './services/restAPI.service';
import { SharedService } from './services/Shared';
import { WeaknessesService } from './services/weaknesses.service';

@Directive({
  selector: '[date-range]'
})
export class DateRange {
  constructor(    
    public controlService : ControlsService,
    public weaknessService : WeaknessesService,
    private rest_service : restAPI,
    public sharedService : SharedService,
    public gapService : GapService,
    public loginInfo : login) { }

  @HostListener('change', ['$event']) public onDateChange(evt) {
    console.log("event : ", evt)
  }

}
