import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';@Injectable({
providedIn: 'root'
})
export class SharedService {
private subject = new Subject<any>();
public filterSubject = new BehaviorSubject(0);   
    
sendClickEvent() {
  this.subject.next();
}


getClickEvent(): Observable<any>{ 
  return this.subject.asObservable();
}

sendFilterEvent(event){
    this.filterSubject.next(event);
}


}