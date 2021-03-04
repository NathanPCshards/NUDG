import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
//private socketUrl = "http://localhost:4200"
//private socket;
messages: any[] = [];
private subject = new Subject<any>();
public filterSubject = new BehaviorSubject(0);   
    
  constructor(private http: HttpClient) { 
 //   this.socket = io(this.socketUrl);
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


}