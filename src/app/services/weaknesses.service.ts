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
   fetchAll(id: any = null, CompanyName): Observable<weaknesses[]> {
     let tempUrl;
     id ? tempUrl = `http://localhost:3000/weaknesses/${id}/${CompanyName}`: tempUrl = "http://localhost:3000/weaknesses"
     console.log("weaknesses url : ", tempUrl)

    return this.http
      .get<weaknesses[]>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched weaknesses")),
        catchError(
          this.errorHandlerService.handleError<weaknesses[]>("fetchAll", [])
        )
      );
  }

  //Post Requests
  post(item: any, CompanyName : any): Observable<any> {
    console.log("post weaknesses", item, CompanyName);
    let url  = `http://localhost:3000/weaknesses/${item.Nid}/${CompanyName}`
    return this.http
      .post(url, item)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  //Put Requests
  update(item: any, CompanyName : any): Observable<any> {
    console.log("update weaknesses", item);
    let url  = `http://localhost:3000/weaknesses/${item.Nid}/${CompanyName}`

    return this.http
      .put<weaknesses>(url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  //Delete Requests
  delete(id: number, CompanyName): Observable<any> {
    const url = `http://localhost:3000/weaknesses/${id}/${CompanyName}`;
    console.log("delete weaknesses")


    return this.http
      .delete<weaknesses>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

  //Patch Requests
  patch(item: any, CompanyName): Observable<any> {
    let tempUrl;
    tempUrl = `http://localhost:3000/weaknesses/${item.Nid}/${CompanyName}`
    console.log("patch weaknesses", item);
    console.log("url : " , tempUrl)

    return this.http
      .patch<weaknesses>(tempUrl, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("patch")));
  }

}
