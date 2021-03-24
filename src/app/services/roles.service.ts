import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { roles } from "../models/roles"
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/roles"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<roles[]> {
    return this.http
      .get<roles[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched roles")),
        catchError(
          this.errorHandlerService.handleError<roles[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<roles>): Observable<any> {
    return this.http
      .post<Partial<roles>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: roles): Observable<any> {
    return this.http
      .put<roles>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/roles/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<roles>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}


//Normal: 45 height on top
//        44 height on bot

//expand: 