import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { guidelines } from "../models/guidelines";

import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GuidelinesService {
  //url must match route in the app.use(...) in index.js
  private url = "http://localhost:3000/guidelines"
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  
    constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
     }
  
     fetchAll(): Observable<guidelines[]> {
      return this.http
        .get<guidelines[]>(this.url, { responseType: "json" })
        .pipe(
          tap((_) => console.log("fetched guidelines")),
          catchError(
            this.errorHandlerService.handleError<guidelines[]>("fetchAll", [])
          )
        );
    }
  
    post(item: Partial<guidelines>): Observable<any> {
      console.log("post guidelines")
      return this.http
        .post<Partial<guidelines>>(this.url, item, this.httpOptions)
        .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
    }
  
    update(guideline: guidelines): Observable<any> {
      console.log("update guidelines")

      return this.http
        .put<guidelines>(this.url, guideline, this.httpOptions)
        .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
    }
  
    delete(id: number): Observable<any> {
      const url = `http://localhost:3000/guidelines/${id}`;
      console.log("delete guidelines")
  
      return this.http
        .delete<guidelines>(url, this.httpOptions)
        .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
    }
  
  }
  















  