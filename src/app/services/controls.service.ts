import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  //url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/controls"
onClick = new EventEmitter();

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   emit(temp : any) {
    this.onClick.emit(temp);
  }


   fetchAll(id: any): Observable<controls[]> {
    let tempUrl;
    id ? tempUrl = `http://localhost:3000/controls/${id}` : tempUrl = "http://localhost:3000/controls"
    console.log("control url : ", tempUrl)

    return this.http
      .get<controls[]>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched controls")),
        catchError(
          this.errorHandlerService.handleError<controls[]>("fetchAll", [])
        )
      );
  }

  post(item: any): Observable<any> {
    console.log("post controls")
    return this.http
      .post(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: controls): Observable<any> {
    console.log("update controls")
    return this.http
      .put<controls>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/controls/${id}`;

    return this.http
      .delete<controls>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }


}
