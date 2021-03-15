import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { inventories } from "../models/inventory";
import { milestones } from "../models/milestones";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class MilestonesService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/milestones"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<milestones[]> {
    return this.http
      .get<milestones[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<milestones[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<milestones>): Observable<any> {
    return this.http
      .post<Partial<milestones>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(inventory: milestones): Observable<any> {
    return this.http
      .put<milestones>(this.url, inventory, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/milestones/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<inventories>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
