import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { controls } from "../models/controls"
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/controls"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<controls[]> {
    return this.http
      .get<controls[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched controls")),
        catchError(
          this.errorHandlerService.handleError<controls[]>("fetchAll", [])
        )
      );
  }

  post(item: any): Observable<any> {
    console.log("this is the control:", item, "caught it")
    return this.http
      .post(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: controls): Observable<any> {
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
