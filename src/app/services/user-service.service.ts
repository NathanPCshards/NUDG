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
private url = "http://192.168.0.70:3000/orgusers"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }
/*
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

  post(item: any): Observable<any> {
    return this.http
      .post(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: any): Observable<any> {
    return this.http
      .put(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(idOrgUsers: number): Observable<any> {
    const url = `http://192.168.0.70:3000/orgusers/${idOrgUsers}`;
   //const url = `http://192.168.0.70:3000/users`;

    return this.http
      .delete<Users>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }
*/
}
