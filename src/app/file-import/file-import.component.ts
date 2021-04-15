import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss']
})
export class FileImportComponent implements OnInit {

  fileOver;

  constructor() { }

  ngOnInit(): void {
  }
  uploadFile(evt){
    console.log('evt: ', evt);
    // evt is an array of the file(s) dropped on our div. Here we're assuming only one file has been uploaded
    let payload = new FormData();
    payload.append('data', evt[0]);
    console.log(payload)

    

   // let files = evt.srcElement.files; 


    // File can now be uploaded by doing an http post with the payload
  }

}


