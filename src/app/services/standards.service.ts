import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { standards } from "../models/standards";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class StandardsService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/standards"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<standards[]> {
    return this.http
      .get<standards[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched standards")),
        catchError(
          this.errorHandlerService.handleError<standards[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<standards>): Observable<any> {
    return this.http
      .post<Partial<standards>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: standards): Observable<any> {
    return this.http
      .put<standards>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/standards/${id}`;

    return this.http
      .delete<standards>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
