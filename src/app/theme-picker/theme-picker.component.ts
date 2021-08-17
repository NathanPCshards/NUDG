import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  ThemeService } from '../core/services/ThemeService.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  currentTheme: Observable<String>;

  constructor(
    private themeService : ThemeService

  ) {
   }

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;

  }
  
  installTheme(themeName: string) { 

    } 

    loadTheme(theme){

    
    }
  


  setTheme(checked : String){
  //  document.body.style.backgroundColor = "#c5cae9"

    this.themeService.setTheme(checked)
  }


}
