import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { groups } from "../models/groups";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/groups"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<groups[]> {
    return this.http
      .get<groups[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched groups")),
        catchError(
          this.errorHandlerService.handleError<groups[]>("fetchAll", [])
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
    const url = `http://localhost:3000/groups/${id}`;

    return this.http
      .delete<groups>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
