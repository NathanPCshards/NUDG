import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { login } from 'src/app/injectables';
import { controls } from 'src/app/models/controls';
import { policy } from 'src/app/models/policy';
import { standards } from 'src/app/models/standards';
import { ControlsService } from 'src/app/services/controls.service';
import { GuidelinesService } from 'src/app/services/guidelines.service';
import { restAPI } from 'src/app/services/restAPI.service';
import { WeaknessesService } from 'src/app/services/weaknesses.service';


@Component({
  selector: 'app-policy-editor',
  templateUrl: './policy-editor.component.html',
  styleUrls: ['./policy-editor.component.scss']
})
export class PolicyEditorComponent implements OnInit {

  standards$
  weaknesses$
  controls$
  id
  date
  standardsList
  policy$
  allPolicies$;
  routeSub
  uniqueNidList$
  NidDisplayList$;
  NidFilter$;
  gapMatTabIndex
  gapStatus
  viewIndex

  policyForm: FormGroup = this.formBuilder.group({
    NidFilterList : []
  });

  NidFilterList = []

  guideline$ 
  gapTableData
  viewGapData
  gapDates

  XCountForHTML
  YCountforHTML




  constructor(


    private formBuilder: FormBuilder,
    private router:Router, 
    private route: ActivatedRoute,

    private weaknessservice: WeaknessesService,
    private controlsservice: ControlsService,
    private guidelinesService: GuidelinesService,



    private loginInfo: login,
    private rest_service : restAPI


  ) { }

  
  async ngOnInit(): Promise<void> {

    this.gapTableData = []
    this.viewGapData = []
    
       //Sets defualt page to be AC-N.01
    //Pulling correct policy.
    this.routeSub = this.route.params.subscribe(params => {
      console.log("params : " , params)
      this.id = params['id'];
      this.date = params['date']
      });
    this.id ? true : this.id = "AC-N.01"
    this.date ? true : this.date = "1/1/2021"

     // to pull data from the route information


      console.log("current id:  " , this.date)
    if (this.date != 1){
      this.setView(1)
    }
    else{
      this.setView(0)

    }

    //POLICY STUFF
    this.policy$ = await this.fetchPolicy(this.id);
    this.allPolicies$ = await this.rest_service.get(`http://192.168.0.70:3000/policy/All/${this.loginInfo.CompanyName}`).toPromise();

    this.rest_service.standardEmit.subscribe(element => {

      let temp = this.rest_service.post(`http://192.168.0.70:3000/standards/${this.id}/${this.loginInfo.CompanyName}`, {"Standard" : element})
      .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
      temp.subscribe(async element=> {
        this.standardsList = []

        //Adding Control that was just created.
        this.standardsList.push(element.insertId)
        //Getting idControl field of current policy.
        let ctrlSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idStandards`)
        ctrlSub.forEach(async dataArray => {
          dataArray.forEach(element => {
            //Converting String of "[id1,id2,id3]" to a real array
            let control_ids =  element.idStandards.trim().replace("\[","").replace("\]","").split(",")
            control_ids.forEach(id => {
              //Adding ids from policy to temp array
              this.standardsList.push(Number(id))
            });
          });
          //Updating the policy with the new control id that was made
          console.log("list being sent : " , this.standardsList)
          let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idStandards`,{"nudgid":this.id, "data" :this.standardsList})
          temp2.subscribe();
        });

      });
    });


    this.standards$ = this.fetchAllStandards();


    this.guideline$ = this.getByID(this.id)
    this.guideline$.subscribe(res=>{
      console.log('result : ' , res)
    })


    this.gapDates = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}/?getUniqueDatesSpecific=True`)
    await this.gapDates.forEach(array => {
      console.log("dates : " , array)
      this.setGapView(array[0].Gdate,0)
      array.forEach(element => {
        this.getCounts(element.Gdate)
      });
    });


    console.log(this.allPolicies$)

    //getting unique Nudg Id's
    this.NidFilter$ = this.policyForm.get('NidFilterList')!.valueChanges
    .pipe(
      startWith(''),
      map(value=> this._filterNid(value))
    )

    this.NidFilter$.forEach(element => {
    });



     //Applying Filters
     this.NidFilter$ = this.policyForm.get('NidFilterList')!.valueChanges
     .pipe(
       startWith(''),
       map(value=> this._filterNid(value))
     )


    //serves as observable subscription
     this.NidFilter$.forEach(element => {
    });

    //Unique Lists

    
    this.NidFilterList.push(this.allPolicies$)

    console.log("nid filter : ", this.NidFilterList)
    
    this.NidFilterList = this.NidFilterList.sort((a,b)=>{

      return a.nudgid > b.nudgid ? 1 : 0 
    })
    this.initHtmlArrays()

}

tabSwitched(event){
  console.log("tab switched")
  console.log("event : " , event)
  if (event.index == 0){
    let temp = (<HTMLInputElement>document.getElementById("searchAll"))
    temp.value = ""
  }
  else if (event.index == 1){
    let temp2 = (<HTMLInputElement>document.getElementById("searchRouting"))
    temp2.value = ""
  }


  this.NidFilterList = []
  this.NidFilterList.push(this.allPolicies$)
  this.NidDisplayList$ = this.allPolicies$
}

_filterNid(value: string){
  //input is text to filter by
  value = value.toLowerCase()
  this.NidFilterList = []
  this.NidFilterList.push(this.allPolicies$)
this.NidFilterList.forEach(element => {
  if (value){
    this.NidDisplayList$ = element.filter(x=>x.nudgid.toLowerCase().includes(value))

    return element.filter(x=> x.nudgid.toLowerCase().includes(value)) 
  }
    this.NidDisplayList$ = element
    return element

});


this.initHtmlArrays(this.NidDisplayList$)

}

getByID(id){
  return this.rest_service.get(`http://192.168.0.70:3000/guidelines/${this.loginInfo.CompanyName}?getByID=${id}`)
}

setView(index){

  this.viewIndex = index
}

deletePolicy(policy){
  
  let temp = this.rest_service.delete(`http://192.168.0.70:3000/Policy/${policy.idPolicy}/${this.loginInfo.CompanyName}`);

  temp.subscribe(result=>{
    if(result){
      console.log("result : " , result[0].info)
    }
  })
  //remove the policy from policies :nudgid
  //delete any controls             : Nid
  //weaknesses                      : Nid
  //standards                       : Nid
  //gap questions                   : Nid
  //guidelines                      : Nid

  //procedures associated with the controls
  //milestones associated with the weaknesses



}

setGapView(row, index){

  //get date from row clicked
  //call 
  let pipe = new DatePipe('en-US'); // Use your own locale
  let gapDate = pipe.transform(row, 'M/d/yyyy')

  
  let temp = this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}/?Gdate=${gapDate}`)
  temp.subscribe(res=>{
    this.viewGapData = res
  })

  this.gapMatTabIndex = index
}

debug(){
  console.log("check")

  console.log(this.viewGapData)
  console.log(this.gapTableData)
  this.policy$.forEach(element => {
      console.log("element : " , element)
  });
  console.log("all policies : " , this.allPolicies$)
console.log('Nid display : ' , this.NidDisplayList$)

}




updatePolicyColumn(data,column){

  let temp = this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=${column}`,{data: data})
  temp.subscribe(res=>{
    console.log("Result:   " , res[0].info)
  })
}


async getCounts(date){
  //Determining and updating policy's gap status by getting counts of it's gap question's answers
   this.gapStatus = null
   var sub1;
   var sub2;
   var sub3;

   let temp = []
   let gapStatus

   sub1 = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}/?CountWeaknesses=${date}`).forEach(data=>{
     data.forEach(dataArray => {
       temp.push(["Weaknesses",dataArray['COUNT(Ganswer)']])  
     });
   })
  sub2 = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}/?CountPartial=${date}`).forEach(data=>{
  data.forEach(dataArray => {  
    temp.push(["Partial",dataArray['COUNT(Ganswer)']])  
   });
 })
  sub3 = await this.rest_service.get(`http://192.168.0.70:3000/gap/${this.id}/${this.loginInfo.CompanyName}/?CountYes=${date}`).forEach(data=>{
  data.forEach(dataArray => {  
    temp.push(["Yes",dataArray['COUNT(Ganswer)']])  
   });
 })
 
 temp.forEach(element => {
    let key = element[0]
    let value = element[1]
  //Rules here
  //Any answer weakness : Weakness
  //Any answer Partial : Partial
  //All answers 'Yes' : Ready
  if (key =="Yes" && value >= 1 && this.gapStatus == null){
    gapStatus = "Ready"
  }
  if (key =="Partial" && value >= 1 && this.gapStatus == null){
    gapStatus = "In Progress"

  }
  if (key =="Weaknesses" && value >= 1 && this.gapStatus == null){
    gapStatus = "Deficient"
  }

 });

 //6/23/2021
 let tempdate = new Date(date)
 var timeZoneDifference = (tempdate.getTimezoneOffset() / 60 )*-1
 //when converting a date to string, angular doesnt account for timezone and the date changes, so we have to do math to get the offset.
 tempdate.setTime(tempdate.getTime() + (timeZoneDifference+8 * 60) * 60 * 1000);

 //this object is getting a little weird here...
 //its structured like [Date for routing, Status, Date for display]
 this.gapTableData.push([tempdate.toLocaleDateString().replace("/", "\\").replace("/", "\\"),gapStatus, tempdate])

    return temp
 }


fetchAllWeaknesses(Nid: any) {
  return this.weaknessservice.fetchAll(Nid, this.loginInfo.CompanyName);
}



fetchAllStandards(): Observable<standards[]> {
  return this.rest_service.get(`http://192.168.0.70:3000/standards/${this.id}/${this.loginInfo.CompanyName}`)
}

async deleteStandards(id: any): Promise<void> {


  let temp = await this.rest_service.delete(`http://192.168.0.70:3000/standards/${id}/${this.loginInfo.CompanyName}`)
  .pipe(tap(() => (this.standards$ = this.fetchAllStandards())));
  temp.subscribe()

  this.standardsList = []

  let standardSub = await this.rest_service.get(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?GetOneColumn=idStandards`)
  standardSub.forEach(async dataArray => {
    dataArray.forEach(element => {
      //Converting String of "[id1,id2,id3]" to a real array
      let standard_ids =  element.idStandards.trim().replace("\[","").replace("\]","").split(",")
      standard_ids.forEach(id => {
        //Adding ids from policy to temp array
        this.standardsList.push(Number(id))
      });
    });
    //Remove the correct control
    let index = this.standardsList.indexOf(id)
    if (index != -1){
      this.standardsList.splice(this.standardsList.indexOf(id), 1)
    }


    let temp2 = await this.rest_service.update(`http://192.168.0.70:3000/policy/${this.id}/${this.loginInfo.CompanyName}?UpdateOneColumn=idStandards`,{"nudgid":this.id, "data" :this.standardsList})
    temp2.subscribe();
  });
   
}

  public policySearch(event: any, name : any)
  {
      console.log(event, name)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["PolicyEditor/"+name,"/2"]));
    
  }


  fetchPolicy(id): Observable<policy[]> {
    return this.rest_service.get(`http://192.168.0.70:3000/policy/${id}/${this.loginInfo.CompanyName}`);
  }

  displayPolicy(nudgid){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["PolicyEditor/",String(nudgid).trim(),"/2"]));
  }




  initHtmlArrays(optionalArray=[]){   
    //If an array is sent as input, make the 2d array from that.
    //if an array is not sent, make the 2d array from the policy list
    //an array is sent from the search filter results
    let amountInRow = 5
    let numRows 
    let temp
    if (optionalArray.length > 0){
      optionalArray = optionalArray.sort((a,b)=>{

        return a.nudgid > b.nudgid ? 1 : 0 
      })

      numRows = Math.ceil(optionalArray.length/amountInRow-1)
      this.XCountForHTML = Array(5).fill(amountInRow)
      this.YCountforHTML = []
      temp = []
      optionalArray.map((element,index)=>{
        if (index%amountInRow == 0 && index != 0){

        this.YCountforHTML[this.YCountforHTML.length] = temp.sort()
        //this.YCountforHTML.sort()
        temp = []
      }
      temp.push(element)
    })



    if (temp != []){
      this.YCountforHTML[this.YCountforHTML.length] = temp
    }

    }
    else{
      this.allPolicies$ = this.allPolicies$.sort((a,b)=>{

        return a.nudgid > b.nudgid
      })
      let amountInRow = 5
      numRows = Math.ceil(this.allPolicies$.length/amountInRow-1)
     
      this.XCountForHTML = Array(5).fill(amountInRow)
      this.YCountforHTML = []


    temp = []
    this.allPolicies$.map((element,index)=>{
      if (index%amountInRow == 0 && index != 0){

        this.YCountforHTML[this.YCountforHTML.length] = temp.sort()
        //this.YCountforHTML.sort()
        temp = []
      }
      temp.push(element)
    })



    if (temp != []){
      this.YCountforHTML[this.YCountforHTML.length] = temp
    }

    }

   
    //Transpose the 2d array here to display in more coherent order.
    let temp3 = this.YCountforHTML[0].map((_, colIndex) =>  this.YCountforHTML.map(row => row[colIndex]));
    this.YCountforHTML = temp3

  
    for (let index = 0; index < this.YCountforHTML.length; index++) { //for every colum
      this.YCountforHTML[index] = this.YCountforHTML[index].filter(x=>{
        return x !== undefined
      })
    }

  }



}