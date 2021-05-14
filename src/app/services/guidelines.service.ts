import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { login } from "../injectables";
import { guidelines } from "../models/guidelines";

import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class GuidelinesService {
  //url must match route in the app.use(...) in index.js
  private url = `http://localhost:3000/guidelines/${this.loginInfo.CompanyName}`
  onOpen = new EventEmitter();
  onClose = new EventEmitter();
  toComponent = new EventEmitter();

  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  
    constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient, private loginInfo: login) {
     }


     openGuideline(id : any, guideline: any) {
      let temp = [id,guideline]
      this.onOpen.emit(temp);
      this.toComponent.emit(temp)
    }
    closeGuideline(id : any, guideline: any) {
      let temp = [id,guideline]
     this.onClose.emit(temp);
   }
  
     fetchAll() {
      return this.http
        .get<any>(this.url, { responseType: "json" })
        .pipe(
          tap((_) => console.log("fetched guidelines")),
          catchError(
            this.errorHandlerService.handleError<guidelines[]>("fetchAll", [])
          )
        );
    }
  
    post(item: Partial<guidelines>): Observable<any> {
      console.log("post guidelines")
      return this.http
        .post<Partial<guidelines>>(this.url, item, this.httpOptions)
        .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
    }
  
    update(guideline: guidelines): Observable<any> {
      console.log("update guidelines")

      return this.http
        .put<guidelines>(this.url, guideline, this.httpOptions)
        .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
    }
  
    delete(id: number): Observable<any> {
      const url = `http://localhost:3000/guidelines/${id}/${this.loginInfo.CompanyName}`;
      console.log("delete guidelines")
  
      return this.http
        .delete<guidelines>(url, this.httpOptions)
        .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
    }
  
  }
  















  