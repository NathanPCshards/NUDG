import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { procedures } from "../models/procedures";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/procedures"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<procedures[]> {
    return this.http
      .get<procedures[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<procedures[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<procedures>): Observable<any> {
    return this.http
      .post<Partial<procedures>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(inventory: procedures): Observable<any> {
    return this.http
      .put<procedures>(this.url, inventory, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/procedures/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<procedures>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
