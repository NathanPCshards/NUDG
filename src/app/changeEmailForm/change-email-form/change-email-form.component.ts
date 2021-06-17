import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrls: ['./change-email-form.component.scss']
})
export class ChangeEmailFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let objects = document.getElementsByClassName("app")
    let i = 0
    Array.from(objects).forEach(element => {
      //@ts-ignore
      objects[i].style.display = "none"
      i++
    });



  }

  ngOnDestroy(){
    let objects = document.getElementsByClassName("app")
    let i = 0
    Array.from(objects).forEach(element => {
      //@ts-ignore
      objects[i].style.display = "block"
      i++
    });
  }
}
