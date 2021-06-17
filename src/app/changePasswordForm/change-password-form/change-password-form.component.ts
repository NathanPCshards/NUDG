import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

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
