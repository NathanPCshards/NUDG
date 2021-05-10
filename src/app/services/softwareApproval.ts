import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { procedures } from "../models/procedures";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class softewareApprovalService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/softwareApproval"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): any {
    const url = `http://localhost:3000/softwareApproval`;
    console.log("fetch procedure at : " , url)
    return this.http
      .get<any[]>(url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched users")),
        catchError(
          this.errorHandlerService.handleError<any[]>("fetchAll", [])
        )
      );
  }

  post(item: any): any {
    return this.http
      .post<any>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(inventory: any): any{
    return this.http
      .put<any>(this.url, inventory, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: any): any {
    const url = `http://localhost:3000/softwareApproval/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<procedures>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
