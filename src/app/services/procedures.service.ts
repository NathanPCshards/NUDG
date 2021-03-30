import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
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
onClick = new EventEmitter();

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   emit(temp : any) {
    this.onClick.emit(temp);
  }

   fetchAll(id: any): Observable<procedures[]> {
    const url = `http://localhost:3000/procedures/${id}`;
    console.log("fetch procedure at : " , url)
    return this.http
      .get<procedures[]>(url, { responseType: "json" })
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
