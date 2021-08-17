/*import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class StyleManagerService {

    constructor() { }
    setStyle(key: string, href: string) { getLinkElementForKey(key).setAttribute('href', href); 

    }
    removeStyle(key: string) { 
        const existingLinkElement = getExistingLinkElementByKey(key); 
        //@ts-ignore
        if (existingLinkElement) {  document.head.removeChild(existingLinkElement); 
        } 
    }
}

function getLinkElementForKey(key: string) {
            //@ts-ignore

    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) { 
    document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) { 
    const linkEl = document.createElement('link'); 
    linkEl.setAttribute('rel', 'stylesheet'); 
    linkEl.setAttribute('type', 'text/scss'); linkEl.classList.add(getClassNameForKey(key)); document.head.appendChild(linkEl); 
    return linkEl;
}

function getClassNameForKey(key: string) { 
    return `style-manager-${key}`;
} 
*/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {
  private _currentTheme = new Subject<String>();
  currentTheme = this._currentTheme.asObservable();

  setTheme(currentTheme: String): void {
    this._currentTheme.next(currentTheme);
  }


}