import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class taskService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/task"
onClick = new EventEmitter();

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }


    emit(temp : any) {
    this.onClick.emit(temp);
    }

   fetchAll(): Observable<any[]> {
    return this.http
      .get<any[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<any[]>("fetchAll", [])
        )
      );
  }

  post(item: any): Observable<any> {
    console.log("posting task : " , item)
    console.log('to url : ', this.url)
    console.log("http options? : " , this.httpOptions)
    return this.http
      .post(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(item: any): Observable<any> {
    return this.http
      .put(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/task/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
