import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { roles } from "../models/roles"
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class SharedResourcesService {
//url must match route in the app.use(...) in index.js
private url = "http://192.168.0.70:3000/sharedResources"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll() {
    return this.http
      .get<any>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched sharedResources")),
        catchError(
          this.errorHandlerService.handleError<any>("fetchAll", [])
        )
      );
  }

  post(item: any){
    console.log("posting item : " , item)
    return this.http
      .post<any>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(user: any){
    return this.http
      .put<any>(this.url, user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number){
    const url = `http://192.168.0.70:3000/sharedResources/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}

