import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-phone-form',
  templateUrl: './change-phone-form.component.html',
  styleUrls: ['./change-phone-form.component.scss']
})
export class ChangePhoneFormComponent implements OnInit {

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
