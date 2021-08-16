// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class login {
  token: string;
  userId: string;
  CompanyName: string;
  todaysDate = new Date();
  name: string;
  passwordLength: number;
  phone: string;
  email: string;
  password: string;
}
export class AccordionState {
  open: boolean = false;
  currentPage: String = "controls";
}