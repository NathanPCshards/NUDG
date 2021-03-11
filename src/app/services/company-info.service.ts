import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { companyInfo } from "../models/companyInfo";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/CompanyInfo"

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   fetchAll(): Observable<companyInfo[]> {
    return this.http
      .get<companyInfo[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched companies")),
        catchError(
          this.errorHandlerService.handleError<companyInfo[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<companyInfo>): Observable<any> {
    return this.http
      .post<Partial<companyInfo>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(inventory: companyInfo): Observable<any> {
    return this.http
      .put<companyInfo>(this.url, inventory, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/CompanyInfo/${id}`;
   //const url = `http://localhost:3000/users`;

    return this.http
      .delete<companyInfo>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
