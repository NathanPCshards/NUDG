import { HttpClient, HttpRequest } from '@angular/common/http';
import { resolveForwardRef } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';
import { SharedResourcesService } from '../services/shared-resources.service';

@Component({
  selector: 'app-shared-resources-form',
  templateUrl: './shared-resources-form.component.html',
  styleUrls: ['./shared-resources-form.component.scss']
})
export class SharedResourcesFormComponent implements OnInit {
  SRForm;
  id;
  desc;
  postSub;
  panelOpenState =  false;
  sharedResources$
  displayedColumns: String[] = ['select','id', 'desc','date'];
  fileArray = []
  


  resourceSub$
  fileToShow

  urls
  files
  filesOutgoing$
  fileOutgoingName
  allFiles;
  displayList;
  test$;

    constructor(private http:HttpClient, 
      private formBuilder: FormBuilder,
      private sharedResourceService : SharedResourcesService,
      private rest_service : restAPI,
      private loginInfo : login,
      private sanitizer: DomSanitizer) { }
  
  ngOnInit(){

    this.loadData()
   


   
  }

   ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  async fetchall(){
    return await this.rest_service.get(`http://192.168.0.70:3000/sharedResources/${this.loginInfo.CompanyName}`)
  
  }
  loadData(){
    this.files =  [] 
    this.displayList = []
    this.urls = []

    this.sharedResources$ = this.fetchall()
    this.sharedResources$.subscribe(async data =>{
      for (let index = 0; index < data.length; index++) {
       const entry = data[index];
       this.files.push(entry.SRupload)
        this.displayList[index] = [entry]
      }

      for (let index2 = 0; index2 < this.files.length; index2++) {
        const filename = this.files[index2];
        await this.rest_service.getFile(filename).subscribe(data=>{
          this.displayList[index2] = [this.displayList[index2],this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data)) , filename]
          this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data)))
    
        })
      }
    })

    console.log("display list : " , this.displayList)
  }

  
  public submit(SRtitle,SRdescription,SRupload) {

    let data = {SRtitle,SRdescription,SRupload : this.filesOutgoing$.name}

    //Post data as a new shared resource entry
    console.log("posting : " , data)

    let temp2 = this.rest_service.post(`http://192.168.0.70:3000/sharedResources/${this.loginInfo.CompanyName}`, data)
    .pipe(tap(() => (this.loadData())));
    temp2.subscribe()

    
    //save file to folder
    const formData = new FormData()
    formData.append("file", this.filesOutgoing$);
    let temp = this.rest_service.upload(formData)
    .pipe(tap(() => (this.loadData())));

    temp.subscribe()
  }

  setFile(file){
     this.filesOutgoing$ = (<HTMLInputElement>document.getElementById("input-file")).files[0]
  }



  async delete(id : any, element : any){
    console.log("id : " , id)
    console.log("element : " , element)
    let filename = element[2]
    //Delete file from server, likely the hard part?

   // let temp = await this.rest_service.delete(`http://192.168.0.70:3000/sharedResources/${id}/${this.loginInfo.CompanyName}`)
   

   // temp.subscribe()

    let temp2 = await this.rest_service.delete(`http://192.168.0.70:3000/remove?filename=${filename}`)
 //   .pipe(tap(() => (this.loadData())));

    temp2.subscribe()
    this.loadData()
}

  

}   


  // console.log("test : " , test$)

    /*
    test$.forEach(element => {
      console.log("test : " , element)
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(element));

    });
*/





