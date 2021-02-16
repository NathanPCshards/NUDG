import { Component, OnInit } from '@angular/core';








@Component({
  selector: 'app-policy-board',
  templateUrl: './policy-board.component.html',
  styleUrls: ['./policy-board.component.scss']
})
export class PolicyBoardComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
