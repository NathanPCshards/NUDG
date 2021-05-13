import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { procedures } from "../models/procedures";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class ProceduresService {


  
onClick = new EventEmitter();



  constructor() {
   }

   emit(temp : any) {
    this.onClick.emit(temp);
  }


}
