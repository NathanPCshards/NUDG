import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.component.html',
  styleUrls: ['./personalization.component.scss']
})
export class PersonalizationComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  constructor() { }

  ngOnInit(): void {
    this.opened = true

  }

}
