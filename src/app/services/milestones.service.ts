import { HttpClient, HttpHeaders} from "@angular/common/http";
import { ErrorHandler, EventEmitter, Injectable } from '@angular/core';
import { AnyNaptrRecord } from "node:dns";
import { Observable } from "rxjs";
import { catchError, publish, tap } from "rxjs/operators";
import { inventories } from "../models/inventory";
import { milestones } from "../models/milestones";
import { ErrorHandlerService } from "./error-handler.service";


@Injectable({
  providedIn: 'root'
})
export class MilestonesService {

onClick = new EventEmitter();


  constructor() {}


   emit(temp : any) {
    this.onClick.emit(temp);
  }



}
