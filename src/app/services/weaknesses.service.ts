import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { weaknesses } from "../models/weaknesses";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class WeaknessesService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/weaknesses"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<weaknesses[]> {
    return this.http
      .get<weaknesses[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched weaknesses")),
        catchError(
          this.errorHandlerService.handleError<weaknesses[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<weaknesses>): Observable<any> {
    return this.http
      .post<Partial<weaknesses>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: weaknesses): Observable<any> {
    return this.http
      .put<weaknesses>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/weaknesses/${id}`;

    return this.http
      .delete<weaknesses>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
