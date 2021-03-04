import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from '../models/users';

@Injectable({
    providedIn: 'root'
})

export class UsersListService{
private url = "http://localhost:4200/users"

    constructor(private http: HttpClient){}
}