import { Directive, HostBinding, HostListener } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ControlsService } from './services/controls.service';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {


  @HostBinding('class.fileover') fileOver: boolean;
  constructor( public controlService : ControlsService) { }
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
    let reader = new FileReader()
    if (files.length > 0 ){
     // emit the files through a service to be used somewhere else.
      console.log('you dropped ',files.length,' files')

      if (this.isCSVfile(files[0])){
        reader.readAsText(files[0])
        reader.onload = () =>{
          let csvData = reader.result
          let dataArray = String(csvData).split('\n')
          // IF (FILETYPE = CONTROL){}
          
          for (let index = 1; index < dataArray.length; index++) {
            const entry = dataArray[index].split(",");
            console.log("entry :" ,  entry)
            let Nid = entry[0]
            let Cname = entry[1]
            let Coverview = entry[2]
            let Cissuedate = entry[3]
            let Csharedresources = entry[4]
            let Curl = entry[5]
            let idOrgWeaknesses = entry[6].replace("\r","")
            console.log("weaknesses check : " , idOrgWeaknesses)
/*
         this.controlService
            .post({nudgid, idStandards, Cname, Coverview, Cissuedate, Curl, CProcedure, idOrgWeaknesses})
          
*/

          }
          
         // this.controlService.emit({dataArray})

          
          }
          //IF (FILETYPE = WEAKNESS)
          //IF FILETYPE == GAP

          
      }
      else{
        alert("Please upload a valid .csv File.")
      }


    }
  }

  isCSVfile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
}
