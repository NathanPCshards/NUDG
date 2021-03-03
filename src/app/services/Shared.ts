import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


import {io} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
//private socketUrl = "http://localhost:4200"
//private socket;
private subject = new Subject<any>();
public filterSubject = new BehaviorSubject(0);   
    
  constructor(private http: HttpClient) { 
 //   this.socket = io(this.socketUrl);
  }

sendMessage(message){
  //console.log("ServiceMessage socket id : " , this.socket.id);
  //this.socket.emit('ServiceMessage', message)
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