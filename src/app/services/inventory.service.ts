import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { inventories } from "../models/inventory";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class inventoryService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/inventories"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<inventories[]> {
    return this.http
      .get<inventories[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<inventories[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<inventories>): Observable<any> {
    console.log("testing inventory : " , item)
    return this.http
      .post<Partial<inventories>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(inventory: inventories): Observable<any> {
    return this.http
      .put<inventories>(this.url, inventory, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/inventories/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<inventories>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}