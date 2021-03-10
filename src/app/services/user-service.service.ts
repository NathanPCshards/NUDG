import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { Users } from "../models/users";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/users"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<Users[]> {
    return this.http
      .get<Users[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<Users[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<Users>): Observable<any> {
    return this.http
      .post<Partial<Users>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: Users): Observable<any> {
    return this.http
      .put<Users>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(idusersu: number): Observable<any> {
    const url = `http://localhost:3000/users/${idusersu}`;

    return this.http
      .delete<Users>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
