import { EventEmitter, Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class PolicyAccordionService {
  onAccordionClick = new EventEmitter();
 // entries: any[] = accordionEntries;
  constructor() { }

  emit(temp : any) {
    this.onAccordionClick.emit(temp);
  }

}