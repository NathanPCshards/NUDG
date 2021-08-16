import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  ThemeService } from '../core/services/ThemeService.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(
    private themeService : ThemeService

  ) {
   }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;

  }
  
  installTheme(themeName: string) { 

    } 

  loadTheme(theme){
    //.setStyle('theme', `/assets/themes/${theme}.scss`); 
    console.log("Attempting to load theme")
    let checked = true
    this.themeService.setDarkTheme(checked);
  
  }




  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
