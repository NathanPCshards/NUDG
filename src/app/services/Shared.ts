import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';



const baseUrl = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
private subject = new Subject<any>();
public filterSubject = new BehaviorSubject(0);   
    
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    console.log("'getAll' function called in shared.ts")

    return this.http.get(baseUrl ,
      {responseType:'text'});
  }

  get(id): Observable<any> {
    console.log("'get' function called in shared.ts")

    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    console.log("'create' function called in shared.ts")

    return this.http.post(baseUrl, data,
                                        {responseType:'text'});
  }

  update(id, data): Observable<any> {
    console.log("'update' function called in shared.ts")

    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    console.log("'delete' function called in shared.ts")

    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
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