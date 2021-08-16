import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { login } from '../injectables';
import { controls } from '../models/controls';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  //url must match route in the app.use(...) in index.js
private url = "http://192.168.0.70:3000/controls"
onClick = new EventEmitter();
postEvent = new EventEmitter();

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient, private loginInfo : login) {
   }

   emit(temp : any) {
     console.log("does this happen twice too ? ")
    this.onClick.emit(temp);
  }
  emitPostEvent(temp : any){
    console.log("post event emitted")

    this.postEvent.emit(temp)
  }


   fetchAll(id: any, CompanyName:any, trick:any): Observable<controls[]> {
    let tempUrl;
    id ? tempUrl = `http://192.168.0.70:3000/controls/${id}/${CompanyName}` : tempUrl = "http://192.168.0.70:3000/controls"
    console.log("url : " , `http://192.168.0.70:3000/controls/${id}/${CompanyName}`)

    return this.http
      .get<controls[]>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched controls")),
        catchError(
          this.errorHandlerService.handleError<controls[]>("fetchAll", [])
        )
      );
  }




  post(item: any, CompanyName: any): Observable<any> {
    console.log("item : " , item)
    let url = `http://192.168.0.70:3000/controls/${CompanyName}`
    console.log("post controls : " , url)
    return this.http
      .post(url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }







  
  update(user: controls, CompanyName: any): Observable<any> {
    let url = `http://192.168.0.70:3000/controls/${CompanyName}`

    console.log("update being called")

    return this.http
      .put<controls>(url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number, CompanyName: any): Observable<any> {
    const url = `http://192.168.0.70:3000/controls/${id}/${CompanyName}`;

    return this.http
      .delete<controls>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }


}
