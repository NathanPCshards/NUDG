import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { io } from "socket.io-client";
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nudg';
  toolbar = document.getElementById("toolbar");
  height;


  constructor(private http: HttpClient, private webSocketService: WebsocketService ){
    // client-side
    
  }
  //socket stuff

  ngOnInit(){
    //here we want to connect to socket.io server
    /*
    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    })*/

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


