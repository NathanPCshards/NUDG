import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { map, startWith, tap } from 'rxjs/operators';
import { SharedService } from '../services/Shared';
import { login } from '../injectables';
import { restAPI } from '../services/restAPI.service';
import { policy } from '../models/policy';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    tasks$;
    @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any> ;
    timeEnd$;
    lastSort;
    mwlFlatPicker: any;
    view: CalendarView = CalendarView.Month;
  
    //color template that came with the calendar. (used for event instantiation)
    colors: any = {
      red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
      yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
      },
    };
  
    CalendarView = CalendarView;
    viewDate: Date = new Date();
  
    modalData!: {
      action: string;
      event: CalendarEvent;
    }; 
    
    //came with the calendar. Might be useful so leaving it here.
/*
    actions: CalendarEventAction[] = [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter((iEvent) => iEvent !== event);
          this.handleEvent('Deleted', event);
        },
      },
    ];
  */

    refresh: Subject<any> = new Subject();
    events: CalendarEvent[] = [ ];
    activeDayIsOpen: boolean = false;
    displayEvents$ = []
    //this counter is incremented whenever a task is added. Used for setting the default
    //task name to be Task 0, Task 1 ... This is sorta a work around for drag events failing when
    //events share a name and time.
    //idea for better work around. just add new task to DB and pull the ID back, then use the ID, because its always unique
    //then when update is called add a check to prevent any same-named events from being added
    addCounter = 0
    displayListNoSort = []
    indexMap = []


    //For Policy column/Searching
    NidFilter$;
    uniqueNidList$;
    policyForm: FormGroup = this.formBuilder.group({
      NidFilterList : []
    });
    NidDisplayList$;
    NidFilterList = []

    //for user column/searching
    UserFilter$;
    uniqueUserList$;
    UserForm: FormGroup = this.formBuilder.group({
      UserFilterList : []
    });
    searchNidArray = []
    UserDisplayList$;
    UserFilterList = []
      //Form array stuff (in order for policy and users columns to work correctly. See form Group vs form array)
      /*
      formArray = new FormArray([
        new FormControl('policy'), 
        new FormControl('user')
  
      ])
*/
  
    constructor(
      private modal: NgbModal,
      private sharedService : SharedService,
      private rest_service : restAPI,
      public loginInfo : login,
      private formBuilder: FormBuilder,
    ) {
  
    }
  ngOnInit(): void {

    console.log("-----====== onInit ======-----")
    //pulling 
    this.uniqueNidList$= this.rest_service.get(`http://192.168.0.70:3000/gap/${'None'}/${this.loginInfo.CompanyName}/?getUniqueNids=${true}`)
    this.uniqueUserList$ = this.rest_service.get(`http://192.168.0.70:3000/orgusers/${this.loginInfo.CompanyName}`);

    //apply filter
   
this.NidFilter$ = this.policyForm.get('NidFilterList')!.valueChanges
    .pipe(
      startWith(''),
      map(value=> this.filterNid(value))
    )
    this.UserFilter$ = this.UserForm.get('UserFilterList')!.valueChanges
    .pipe(
      startWith(''),
      map(value=> this._filterUsers(value))
    )

      //Unique Lists
      this.uniqueNidList$.forEach(element => {
        this.NidFilterList.push(element)
      });

      this.uniqueUserList$.forEach(element => {
        this.UserFilterList.push(element)
      });



      //Serves as our observable subscription
      this.NidFilter$.forEach(element => {
      });



      this.UserFilter$.forEach(element => {
      
      });


    console.log("-----====== Done ======-----")




    //Pull existing tasks from the database
    this.reloadData()
    this.setView(CalendarView.Month)
    this.sort('startDate')

  }


  onKeyUpPolicy(event){
    this.filterNid(event.policy)
  }

  onKeyUpUser(event){

    this._filterUsers(event.user)
  }

  filterNid(value: string){
    this.NidFilterList.forEach(element => {
        if (value){
            
           value = value.toLowerCase()
          this.NidDisplayList$ = element.filter(x=>x.Nid.toLowerCase().includes(value))
          return element.filter(x=> x.Nid.toLowerCase().includes(value))
        }
          this.NidDisplayList$ = element
          return element
    });
  }

  _filterUsers(value: string){
    this.UserFilterList.forEach(element => {
        if (value){
            
          value = value.toLowerCase()
          this.UserDisplayList$ = element.filter(x=>x.Ufname.toLowerCase().includes(value))
          return element.filter(x=> x.Ufname.toLowerCase().includes(value))
        }
          this.UserDisplayList$ = element
          return element
    });



  }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }

    sort(column){
      if (column == 'title'){
        if (this.lastSort == 'title'){
          //reverse sort 
          this.displayEvents$.sort(function(a,b){
            return a.title < b.title ? 1 : 0
          })
          this.lastSort = 'reverseTitle'
        }
        else{
          //normal sort
          this.displayEvents$.sort(function(a,b){
            return b.title < a.title ? 1 : 0
          })
          this.lastSort = 'title'
        }

      }
      if(column =='startDate'){
        if (this.lastSort == 'startDate'){
          //reverse sort 
          this.lastSort = 'reverseStartDate'
          this.displayEvents$.sort(function(a,b){
            
            return daysTill(new Date(a.start)) < daysTill(new Date(b.start)) ? 1 : 0
          })

          
        }
        else{
          //normal sort
          this.lastSort = 'startDate'
          this.displayEvents$.sort(function(a,b){
            return daysTill(new Date(a.start)) > daysTill(new Date(b.start)) ? 1 : 0})
        }
       

      }
      if(column =='endDate') {
        if (this.lastSort == 'endDate'){
          //reverse sort 
          this.lastSort = 'reverseEndDate'
          this.displayEvents$.sort(function(a,b){
            return daysTill(new Date(a.end)) < daysTill(new Date(b.end)) ? 1 : 0
          })
        }
        else{
          //normal sort
          this.lastSort = 'endDate'
          this.displayEvents$.sort(function(a,b){
            return daysTill(new Date(a.end)) > daysTill(new Date(b.end)) ? 1 : 0})
        }
      }
    }
  
    eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
      //this is called anytime a event is dropped to a new date.
      //Get the index of the task we're working with

      //events date end is wrong here
      //so is displayevents end

      let index = getTaskIndex(this.displayEvents$,event,true)
 
      //update the date/time locally
      event.start = newStart
      event.end = newEnd
      //Update the DB with the updated task
      this.update(event,index,true)
      //Maps the event into events array
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });



    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      //this is called on drop of event and clicking the event 
      //commenting out for now because having the screen go grey is annoying. but we might want to put a alert here 
      //like showing that the time/date changed because the event was moved

      //this.modalData = { event, action };
      //this.modal.open(this.modalContent, { size: 'lg' });
    }
  
  addEvent(optionalObject=null, policy=null, user=null)  {
    //When adding a new entry, optionalObject is ignored and we just
    //add a default value task. When pulling from the DB, optionalObject is
    //a task from the Db and is added to events accordingly.
    console.log("Object sent to add : " , policy, user)
    

      if (optionalObject == null){

        let data = { 
          title: 'Event ' + this.addCounter,
          dateStart: startOfDay(new Date()).toDateString(),
          dateEnd: endOfDay(new Date()).toDateString(),
          colorPrimary: this.colors.red.primary,
          colorSecondary: this.colors.red.secondary,
          draggable: false,
          resizableBeforeStart: true,
          resizableAfterEnd: true,
          timeStart: "1:00 AM",
          timeEnd: "1:00 PM",
          comment: "",
          alert: "Off",
          policy:"",
          user:"",
          CompanyName:this.loginInfo.CompanyName
     
    
    }
          this.tasks$ =  this.rest_service.post(`http://192.168.0.70:3000/task/${this.loginInfo.CompanyName}`, data)
  
     //to subscribe to the observable (so post goes through)
     this.tasks$.forEach(element => {
    });
    this.tasks$ = this.rest_service.get(`http://192.168.0.70:3000/task/${this.loginInfo.CompanyName}`)

    //Add to display list
    let temp = {
      title: 'Event ' + this.addCounter,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: this.colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      timeStart: "1:00 AM",
      timeEnd: "1:00 PM",
      comment: "",
      alert: "Off",
      originalIndex: this.displayEvents$.length,
      user:"",
      policy:"",
      CompanyName : this.loginInfo.CompanyName
    }

    console.log("object being added to display : " , temp)
    this.displayEvents$.push(temp)
    
    //Add to events
    this.events = [
      ...this.events,
      {
        title: 'Event ' + this.addCounter,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },

      },
    ];
    this.addCounter += 1
      }
      else{
        //optionalObject.user = user;
       // console.log("old policy : " , optionalObject.policy, policy)
       /// optionalObject.policy = policy;
       // console.log("new policy : " , optionalObject.policy, policy)

        //Adding the incoming task to events.
        this.events = [
          ...this.events,
          optionalObject
        ]
        //Adding to display
        this.displayEvents$.forEach(element => {
        //  console.log("display event before add : ", element)

        });

        this.displayEvents$.push(optionalObject)
      //  console.log("adding : " ,optionalObject, policy, user)


        //this is a little different from the actual sort function.
        //used here to retain the sorting after the data updates
        switch(this.lastSort){
          case("title") :             
            this.displayEvents$.sort(function(a,b){
              return b.title < a.title ? 1 : 0
            })
            this.lastSort = 'title';
          break;
  
          case("reverseTitle") :  
     
            this.displayEvents$.sort(function(a,b){
              return a.title < b.title ? 1 : 0
            })
            this.lastSort = 'reverseTitle'; 
          break;
  
          case("startDate") :     
            this.lastSort = 'startDate'
            this.displayEvents$.sort(function(a,b){
              return daysTill(new Date(a.start)) > daysTill(new Date(b.start)) ? 1 : 0})
          break;
  
          case("reverseStartDate") :           
            this.lastSort = 'reverseStartDate'
            this.displayEvents$.sort(function(a,b){
              return daysTill(new Date(a.start)) < daysTill(new Date(b.start)) ? 1 : 0
            });
          break;
  
          case("endDate") :      
            this.lastSort = 'endDate'
            this.displayEvents$.sort(function(a,b){
              return daysTill(new Date(a.end)) > daysTill(new Date(b.end)) ? 1 : 0});
          break;
  
          case("reverseEndDate") :  
              this.lastSort = 'reverseEndDate'
              this.displayEvents$.sort(function(a,b){
                return daysTill(new Date(a.end)) < daysTill(new Date(b.end)) ? 1 : 0
              }) ;
          break;
  
  
        }
        //refreshing screen.

        this.refresh.next()


      }

 

    }
  
  async deleteEvent(eventToDelete: CalendarEvent) {
    console.log("event to delete : " , eventToDelete)
    //getting index of event to delete
    let taskIndex = getTaskIndex(this.displayEvents$, eventToDelete)
    //Remove from display list
    this.displayEvents$.splice(taskIndex,1)
    this.events.splice(taskIndex,1)
    //code that came with calendar (filters/removes from events)
    this.events = this.events.filter((event) => event !== eventToDelete);
    //remove from database
    this.tasks$.forEach(async element => {
      await this.rest_service.delete(`http://192.168.0.70:3000/task/${element[taskIndex].idOrgTasks}/${this.loginInfo.CompanyName}`).toPromise()
  }); 
  }

  setView(view: CalendarView) {
    //called to set month/week/day view
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  
  debugEvent(){
    console.log("debug button pressed")
 

    this.displayEvents$.forEach(element => {
      console.log("Display Events : " , element)

    });


    this.reloadData()
  }

    update(event, index, eventMoved=false, alertValue=""): any {
      console.log("update reached")
      console.log('event : ', event)
      console.log("displayed events", this.displayEvents$[0] )
      console.log("original index : " , event.originalIndex)

      

    
      //Event is the changed event, index is the index that event is located at in several arrays (the indices match between arrays)
      //given a NEW/Different event, update events/task/ DB accordingly
      let temp;
 
      //I needed to add originalIndex here as a way of matching up the indicies again after sorting
      index = event.originalIndex
      //the below line updates the events to reflect the users changes
      this.events[index] = this.displayEvents$[index]
      
      /*TODO
      this.displayEvents$[index].policy = event.policy
      this.displayEvents$[index].user = event.user
 */

      this.tasks$.forEach(async element => {
        //update the entry in tasks
        console.log("Tasks : " , element)
        element[index].title = event.title
        if (eventMoved){
          //if end date/time is before start
          if(event.start > event.end){
            alert("Your start date and time must be BEFORE the end date and time.")
            return 0
          }

          element[index].dateStart = event.start
          element[index].dateEnd = event.end

          element[index].timeStart = this.dateToTime(event.start)
          element[index].timeEnd = this.dateToTime(event.end)
        }
        else{
          if(this.combineDateTime(event.start, event.timeStart) > this.combineDateTime(event.end, event.timeEnd)){
            alert("Your start date and time must be BEFORE the end date and time.")
            return 0
          }

          element[index].dateStart = startOfDay(this.combineDateTime(event.start, event.timeStart))
          element[index].dateEnd = endOfDay(this.combineDateTime(event.end, event.timeEnd))
          element[index].timeStart = event.timeStart
          element[index].timeEnd = event.timeEnd
        }    
        
        element[index].policy = event.policy
        element[index].user = event.user
        //TODO This can be cleaned up to not have the conditional check (just use 1 variable)
        event.colorPrimary ?  element[index].colorPrimary = event.colorPrimary  : element[index].colorPrimary = event.color.primary
        event.colorSecondary ?  element[index].colorSecondary = event.colorSecondary  : element[index].colorSecondary = event.color.secondary
        element[index].comment = event.comment
        if (alertValue != ""){
          //if given a value for alert, update it.
          element[index].alert = alertValue
        }
        temp = element[index]

        //Post updated task to database ()
        await this.rest_service.update(`http://192.168.0.70:3000/task/${this.loginInfo.CompanyName}`,temp).toPromise().then(value=>{this.reloadData()})
        return 1
      });

        this.refresh.next()    

  }

    async reloadData(date1='1-11-11',  date2='2030-11-11'){
      //used to pull data from DB and populate display, events and tasks arrays
      //this is called after almost every change to the calendar. 
      //clear lists
      this.displayEvents$ = []
      this.events = []
      this.tasks$ = await this.rest_service.get(`http://192.168.0.70:3000/task/${this.loginInfo.CompanyName}?date1=${date1}&date2=${date2}`);

      
      this.tasks$.forEach(element => {
       // console.log("all tasks : " , element)
      });


      let eventFromDB

      this.tasks$.subscribe(element => {
        let i = 0

        element.forEach(task => {

           //template out a object to put the DB info into
           eventFromDB = {
            title: task.title,
            start: this.combineDateTime(task.dateStart, task.timeStart),
            end: this.combineDateTime(task.dateEnd, task.timeEnd),
            color: {
                primary: task.colorPrimary,
                secondary: task.colorSecondary
            },
            draggable: task.draggable ? true : false,
            resizable: {
              beforeStart: task.resizableBeforeStart ? true : false,
              afterEnd: task.resizableAfterStart ? true : false,
            },
            timeStart: task.timeStart,
            timeEnd: task.timeEnd,
            comment: task.comment,
            alert: task.alert,
            originalIndex:i,
            user: task.user,
            policy: task.policy

          
          }

          i++
          //Add event
          this.addEvent(eventFromDB)
        });

      }); 
      
      //console.log("End of reload Data : " , eventFromDB)




    }
    
   combineDateTime(date, time){
     //takes ISO date format (although would probably work for other formats), and combines it with 'hh:mm a' formatted Time.
    date = new Date(date)
    let temp = time.split(/[: ]/)
    if (String(temp[2]) == "PM" && temp[0] != 12){
      let adjusted = Number(temp[0]) + 12
      //case where 2:00 PM becomes 14:00 (convert 12 hour to 24 hour)
      return new Date(date.getFullYear(),date.getMonth(), date.getDate(), adjusted,Number(temp[1]),0,0 )
    }
    else if(String(temp[2]) == "AM" && temp[0] == 12){
      //case where 12:03 AM, becomes 0:03 (drop 12, replace with 0)
      return new Date(date.getFullYear(),date.getMonth(), date.getDate(), 0,Number(temp[1]),0,0 )
    }
    else{
      //normal 12 hour to 24 hour conversion
      return new Date(date.getFullYear(),date.getMonth(), date.getDate(), Number(temp[0]),Number(temp[1]),0,0 )
    }

}
   dateToTime(date){
     //takes ISO date format and converts it to 'hh:mm a' time
     let str = date.toLocaleTimeString()
     let temp = str.split(/[: ]/)
     let time = String(temp[0]+":"+temp[1]+" "+temp[3])
     return time
   }

   trackEvent(index: any, item: any) {

    //this function is triggered when input is entered
    //it is send the data once before anything was input, and once after something was input
    //and if whatever this function returns is different from the first trigger, ngDoCheck() is called and (change) tags
    //are triggered in html

    return item;
 }



 

  }
  
  function getTaskIndex(array, taskToFind, dropped=false): any{
    //given a array and task/event to find in that array, this function will iterate through and
    //return the index if it can match its title and time or title and date start.
    //this could lead to unexpected behavior if you have two events with the same name, start, and end time.
     for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (dropped){
        if (element.title == taskToFind.title && element.timeStart == taskToFind.timeStart && element.timeEnd == taskToFind.timeEnd){
          return index
        }

      }
      if (element.title == taskToFind.title && element.start == taskToFind.start && element.end == taskToFind.end){
        return index
      }
      
    }
    return -1




  }
  function daysTill(e) {
    var eventE = new Date(e);
    var today =  new Date();
    return dateDiffInDays(today, eventE);
  }
  function dateDiffInDays(a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }




  