import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
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

onClick = new EventEmitter();


httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }




   emit(temp : any) {
    this.onClick.emit(temp);
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

  post(item: any): Observable<any> {
    console.log("post reached in service : " , item)
    console.log("being sent to this url : " , this.url)
    return this.http
      .post(this.url, item)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(item: any): Observable<any> {
    console.log("update reached in service : " , item)

    return this.http
      .put<weaknesses>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/weaknesses/${id}`;
    console.log("delete reached in service : " , id)
    console.log("being sent to this url : " , url)

    return this.http
      .delete<weaknesses>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
