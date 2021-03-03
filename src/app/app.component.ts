import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { io } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nudg';
  toolbar = document.getElementById("toolbar");
  height;
 

  constructor(private http: HttpClient){
    // client-side
  }

  // Code for when "Create user" button is pressed. Example for page routing
  post(){
     this.http.post<any>('http://localhost:4200/Policies', {username : 'temp username' , password : 'temp password'})
    .subscribe(next=> console.log(next));
  }
  toolbarMouseover(){
    console.log("MOUSE OVER");
    this.height = 40;
  }
  toolbarMouseleave(){
    console.log('mouse leave');
    this.height = 1;
  }
}


