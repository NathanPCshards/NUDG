import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { networkshares } from "../models/networkshares";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class NetworksharesService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/networkshares"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<networkshares[]> {
    return this.http
      .get<networkshares[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<networkshares[]>("fetchAll", [])
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
    const url = `http://localhost:3000/networkshares/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<networkshares>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
