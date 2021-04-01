import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { fadeInItems } from "@angular/material/menu";
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { policy } from "../models/policy";
import { weaknesses } from "../models/weaknesses";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
//url must match route in the app.use(...) in index.js
private url = "http://localhost:3000/policy"


httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
  }

 

  //Get Requests
   fetchAll(id: any = null): Observable<policy[]> {
     let tempUrl;
     id ? tempUrl = `http://localhost:3000/policy/${id}`: tempUrl = "http://localhost:3000/policy"
     console.log("policy url : ", tempUrl)

    return this.http
      .get<policy[]>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched policy: " , id)),
        catchError(
          this.errorHandlerService.handleError<policy[]>("fetchAll", [])
        )
      );
  }

    //Get Requests
    getAll(getImplementedOnly: any=false): Observable<policy[]> {
     let tempUrl = `http://localhost:3000/policy`
 
     return this.http
       .get<policy[]>(tempUrl, { responseType: "json" })
       .pipe(
         tap((_) => console.log("fetched all policies")),
         catchError(
           this.errorHandlerService.handleError<policy[]>("fetchAll", [])
         )
       );
   }

    //We're not actually patching, this was the easiest way I could think of to do a conditional get request
    //It's going to function as a get request but the message type is a patch
    patch(): any {
      let tempUrl = `http://localhost:3000/policy`
  
      return this.http
        .get<number[]>(tempUrl, { responseType: "json" })
        .pipe(
          tap((_) => console.log("patch/get implemented called")),
          catchError(
            this.errorHandlerService.handleError<number[]>("fetchAll", [])
          )
        );
    }

  //Post Requests
  post(item: any): Observable<any> {
    console.log("post policy");

    return this.http
      .post(this.url, item)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  //Put Requests
  update(item: any): Observable<any> {
    console.log("update policy", item);

    return this.http
      .put<policy>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  //Delete Requests
  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/policy/${id}`;
    console.log("delete policy")


    return this.http
      .delete<policy>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }


}
