import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { fadeInItems } from "@angular/material/menu";
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

//Used for dialog closing
   emit(temp : any) {
    this.onClick.emit(temp);
  }

 

  //Get Requests
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

  //Post Requests
  post(item: any): Observable<any> {
    console.log("post weaknesses");

    return this.http
      .post(this.url, item)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  //Put Requests
  update(item: any): Observable<any> {
    console.log("update weaknesses", item);

    return this.http
      .put<weaknesses>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  //Delete Requests
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/weaknesses/${id}`;
    console.log("delete weaknesses")


    return this.http
      .delete<weaknesses>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

  //Patch Requests
  patch(item: any): Observable<any> {
    console.log("patch weaknesses", item);

    return this.http
      .patch<weaknesses>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("patch")));
  }

}
