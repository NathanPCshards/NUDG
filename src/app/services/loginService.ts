import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService {



httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient) {
   }

   SignUp(user): Observable<any[]> {
    console.log("testing SignUp")
    return this.http
      .post("http://192.168.0.70:3000/auth/signup", user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("SignUp")));
   }


 

  Login(user): Observable<any> {
    console.log("testing login : " , user)
    return this.http
      .post("http://192.168.0.70:3000/auth/login", user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("Login")));
  }


  changePassword(user){
    console.log(" for change password : " , user)
    return this.http
      .post("http://192.168.0.70:3000/users/changePassword", user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  changeEmail(user){

    return this.http
      .post("http://192.168.0.70:3000/users/changeEmail", user, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

 



}
