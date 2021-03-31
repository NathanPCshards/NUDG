import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
onClick = new EventEmitter();

messages: any[] = [];
private subject = new Subject<any>();
public filterSubject = new BehaviorSubject(0);   
    
  constructor(private http: HttpClient) { 
    
  }

addMessage(message){
  this.messages.push(message);
}
getMessage(){
  this.messages.pop();
}
clearMessage(message){
  this.messages = [];
}

sendClickEvent() {
  this.subject.next();
}

getClickEvent(): Observable<any>{ 
  return this.subject.asObservable();
}

sendFilterEvent(event){
    this.filterSubject.next(event);
}

//Used for dialog closing
emit(temp : any) {
  this.onClick.emit(temp);
}

}