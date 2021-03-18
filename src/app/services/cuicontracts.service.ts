import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { cuicontracts } from "../models/cuicontracts";

import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class CuicontractsService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/cuicontracts"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<cuicontracts[]> {
    return this.http
      .get<cuicontracts[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched cuicontracts")),
        catchError(
          this.errorHandlerService.handleError<cuicontracts[]>("fetchAll", [])
        )
      );
  }

  post(item: any): Observable<any> {
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
    const url = `http://localhost:3000/cuicontracts/${id}`;

    return this.http
      .delete<cuicontracts>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
