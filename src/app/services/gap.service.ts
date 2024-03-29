
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { controls } from '../models/controls';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GapService {

  //url must match route in the app.use(...) in index.js

onClick = new EventEmitter();

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   emit(data : any, optionalParam : any = false) {
    console.log("gap was emitted")
    this.onClick.emit({data,optionalParam});
  }


   fetchAll(id: any, Gdate:any = ""): Observable<any[]> {
    let tempUrl;
    if (Gdate != "") {
      tempUrl = `http://192.168.0.70:3000/gap?Nid=${id}&Gdate=${Gdate}`
    }
    else{
      tempUrl = `http://192.168.0.70:3000/gap/${id}`
    }

    return this.http
      .get<any[]>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched gap")),
        catchError(
          this.errorHandlerService.handleError<any[]>("fetchAll", [])
        )
      );
  }

  getUniqueDates(): any{
    let tempUrl = `http://192.168.0.70:3000/gap/?getUniqueDates=${true}`
  //  console.log("get unique dates url : " , tempUrl)
    return this.http
      .get<any>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched unique dates")),
        catchError(
          this.errorHandlerService.handleError<any>("getUniqueDates", [])
        )
      );
  }

  getUniqueNids(): any{
    let tempUrl = `http://192.168.0.70:3000/gap/?getUniqueNids=${true}`
    //console.log("get unique nids url : " , tempUrl)
    return this.http
      .get<any>(tempUrl, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched unique Nids")),
        catchError(
          this.errorHandlerService.handleError<any>("getUniqueNids", [])
        )
      );
  }

  post(item: any ,CompanyName : any): Observable<any> {
    let url = `http://192.168.0.70:3000/gap/${CompanyName}`


    return this.http
      .post(url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(item: any, CompanyName : any): Observable<any> {

   let url = `http://192.168.0.70:3000/gap/${CompanyName}`

    return this.http
      .put<any>(url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  updateTemplate(item: any, CompanyName : any): Observable<any> {

    let url = `http://192.168.0.70:3000/gap/${CompanyName}?Template=True`
 
     return this.http
       .put<any>(url, item, this.httpOptions)
       .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
   }



  delete(id: number): Observable<any> {
    const url = `http://192.168.0.70:3000/gap/${id}`;
   // console.log("delete called : ", url, id)
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }


}
