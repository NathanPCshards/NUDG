import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {


  @HostBinding('class.fileover') fileOver: boolean;
  constructor() { }
  @HostListener('dragover', ['$event'] ) public ondragover(evt){
    evt.preventDefault();
    evt.stopPropagation();
   // console.log('drag over')
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    //console.log('drag leave')
  }
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0 ){
     // emit the files through a service to be used somewhere else.
     
      console.log('you dropped ',files.length,' files')
    }
  }


}
