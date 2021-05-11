import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { cuicontracts } from "../models/cuicontracts";

import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class restAPI {
//url must match route in the app.use(...) in index.js

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   get(url, CompanyName): Observable<any> {
    console.log("Get called @ ", url)
    return this.http
      .get<any>(url, { responseType: "json" })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<cuicontracts[]>("get", [])
        )
      );
  }

  post(url, data): Observable<any> {
    console.log("Post called @ ", url)

    return this.http
      .post(url, data, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(url, data): Observable<any> {
    console.log("Update called @ ", url)

    return this.http
      .put(url, data, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(url,CompanyName): Observable<any> {
    console.log("Delete called @ ", url)


    return this.http
      .delete<cuicontracts>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
