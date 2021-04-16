
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GapService {

  //url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/gap"
onClick = new EventEmitter();

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   emit(temp : any) {
    this.onClick.emit(temp);
  }


   fetchAll(id: any): Observable<any[]> {
    let tempUrl;
    id ? tempUrl = `http://localhost:3000/gap/${id}` : tempUrl = "http://localhost:3000/gap"
    console.log("gap url : ", tempUrl)

  

    return this.http
      .get<any[]>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched gap")),
        catchError(
          this.errorHandlerService.handleError<any[]>("fetchAll", [])
        )
      );
  }

  post(item: any): Observable<any> {
    console.log("post gap : " , item)
    return this.http
      .post(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: controls): Observable<any> {
    console.log("update gap")
    return this.http
      .put<any>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/gap/${id}`;

    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }


}
