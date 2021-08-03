import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { login } from "../injectables";
import { cuicontracts } from "../models/cuicontracts";

import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class restAPI {
//url must match route in the app.use(...) in index.js
gapEmit = new EventEmitter();
standardEmit = new EventEmitter();

uploadForm: FormGroup
httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient,private loginInfo : login, private formBuilder : FormBuilder) {
   }

   emit(data : any, optionalParam : any = false) {
     this.gapEmit.emit({data,optionalParam});
   }

   standardsEmit(data : any){
     this.standardEmit.emit(data)
   }
   
   get(url): Observable<any> {
    //console.log("Get called @ ", url)
    return this.http
      .get<any>(url, { responseType: "json" })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<any[]>("get", [])
        )
      );
  }

  getFile(filename) {
  //  console.log("getting file : ", filename)
    return this.http.get(`http://192.168.0.70:3000/download?file=${filename}`, { responseType: "blob" })
  }

  upload(file){
    //console.log("file in service : " , file)
    return this.http.post(`http://192.168.0.70:3000/upload`,file)
    .pipe(catchError(this.errorHandlerService.handleError<any>("upload")));
  }

  post(url, data): Observable<any> {
   // console.log("Post called @ ", url, "data : " , data)

    return this.http
      .post(url, data, this.httpOptions, )
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(url, data): Observable<any> {
 //   console.log("Update called @ ", url)
  //  console.log("updated called with data : " , data)

    return this.http
      .put(url, data)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(url): Observable<any> {
 //   console.log("Delete called @ ", url)


    return this.http
      .delete<any>(url)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
