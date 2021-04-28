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
import { taskService } from '../services/task.service';
import { tap } from 'rxjs/operators';
import { SharedService } from '../services/Shared';




function validateToken(token: string) {
  console.log("checking token")
  return token;
}


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
    mwlFlatPicker: any;
    view: CalendarView = CalendarView.Month;
  
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
  
    refresh: Subject<any> = new Subject();


    //format for a calendar event
    //TODO get/pull data from DB and populate this based on entries
    events: CalendarEvent[] = [ ];
  
    activeDayIsOpen: boolean = false;
    displayEvents$ = []
  
    constructor(
      private modal: NgbModal,
      private taskService : taskService,
      private sharedService : SharedService) {
  
    }
  ngOnInit(): void {
    //Pull existing tasks from the database
    this.reloadData()

    this.sharedService.onClick.subscribe(e=>{
      this.reloadData()
    })

/*
    console.log("===debug===")  
    console.log("this.events: ", this.events)
    console.log("this.displayEvents: "  ,this.displayEvents$)
    console.log("====end====")
*/
    //initialize view to month
    this.setView(CalendarView.Month)
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
  
    eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
      //this is called anytime a event is dropped to a new date.
      //this.update(event,index)

     
      let index = getTaskIndex(this.displayEvents$,event,true)
      console.log("new start : " , newStart)
      console.log("new end : " , newEnd)
      event.start = newStart
      event.end = newEnd
      console.log("event being sent to update : ", event)
      //Update Database with new dates
      this.update(event,index,true)

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
    //  this.handleEvent('Dropped or resized', event);
   //this.reloadData();


    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      //this is called on drop of event and clicking the event 
      //commenting out for now because having the screen go grey is annoying. but we might want to put a alert here 
      //like showing that the time/date changed because the event was moved

      //console.log("handleEvent called")

      //this.modalData = { event, action };
      //this.modal.open(this.modalContent, { size: 'lg' });
    }
  
  addEvent(optionalObject=null)  {
    console.log("addEvent()")
      //in the case a brand new event is created, optionalObject = "" and the below code is executed to
      //add a blank/default value event
      if (optionalObject == null){
        console.log("No object given")
        //Add to database
        this.tasks$ =  this.taskService.post({ 
          title: 'New event',
          dateStart: startOfDay(new Date()),
          dateEnd: endOfDay(new Date()),
          colorPrimary: this.colors.red.primary,
          colorSecondary: this.colors.red.secondary,
          draggable: false,
          resizableBeforeStart: true,
          resizableAfterEnd: true,
          timeStart: "1:00 AM",
          timeEnd: "1:00 PM",
          comment: "",
          alert: "Off"
    
    })
     //to instantiate the observable (so post goes through)
     this.tasks$.forEach(element => {
        
    });
    this.tasks$ = this.taskService.fetchAll()

    //Add to display list
    let temp = {
      title: 'New event',
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
      alert: "Off"
    }
    this.displayEvents$.push(temp)

    //Add to events
    this.events = [
      ...this.events,
      {
        title: 'New event',
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
    }
    else{
      console.log(optionalObject)
      this.events = [
        ...this.events,
        optionalObject
      ]
      this.displayEvents$.push(optionalObject)
      this.refresh.next()
    }

    }
  
  async deleteEvent(eventToDelete: CalendarEvent) {
    console.log("deleteEvent()")
   // console.log("display events before delete : " , this.displayEvents$)
    //getting index of event to delete
    let taskIndex = getTaskIndex(this.displayEvents$, eventToDelete)
    //Remove from display list
    this.displayEvents$.splice(taskIndex,1)
    this.events.splice(taskIndex,1)
    //code that came with calendar (filters/removes from events)
    this.events = this.events.filter((event) => event !== eventToDelete);
    //remove from database
    this.tasks$.forEach(async element => {
      await this.taskService.delete(element[taskIndex].idOrgTasks).toPromise()
  }); 
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  
    debugEvent(){
      console.log("debug button pressed")
      console.log("display List : ", this.displayEvents$)
      console.log("event list : " , this.events)
      this.tasks$.forEach(element => {
        console.log("Tasks list: ", element)
      });
      this.reloadData()
    }

     update(event, index, eventMoved=false, alertValue=""){
       console.log("update()")
       //Event is the changed event, index is the index that event is located at in several arrays (the indices match between arrays)
       //given a NEW/Different event, update events/tasks/ DB accordingly
      let temp;

      //the below line updates the events to reflect the users changes
      this.events[index] = this.displayEvents$[index]

      this.tasks$.forEach(async element => {
        //update the entry and temp save it
        element[index].title = event.title
        if (eventMoved){
          console.log("event moved : " ,event)
          element[index].dateStart = event.start
          element[index].dateEnd = event.end
          element[index].timeStart = this.dateToTime(event.start)
          element[index].timeEnd = this.dateToTime(event.end)
        }
        else{
          element[index].dateStart = startOfDay(this.combineDateTime(event.start, event.timeStart))
          element[index].dateEnd = endOfDay(this.combineDateTime(event.end, event.timeEnd))
          element[index].timeStart = event.timeStart
          element[index].timeEnd = event.timeEnd
        }

        //TODO This can be cleaned up to not have the conditional check (just use 1 variable)
        event.colorPrimary ?  element[index].colorPrimary = event.colorPrimary  : element[index].colorPrimary = event.color.primary
        event.colorSecondary ?  element[index].colorSecondary = event.colorSecondary  : element[index].colorSecondary = event.color.secondary
        element[index].comment = event.comment
        if (alertValue != ""){
          element[index].alert = alertValue
        }
        temp = element[index]
        console.log("posting to DB : ", temp)
        //Post new data to database ()
        await this.taskService.update(temp).toPromise().then(value=>{this.reloadData()})
      });

       this.refresh.next()      

    }

    reloadData(){
      console.log("reloadData()")
      this.displayEvents$ = []
      this.events = []
      this.tasks$ = this.taskService.fetchAll();
      this.tasks$.subscribe(element => {
        element.forEach(task => {
          //template out a object to put the DB info into
          let eventFromDB = {
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
            alert: task.alert
          }
          //put object in lists
          //this.displayEvents$.push(eventFromDB)
          this.addEvent(eventFromDB)
        });
      }); //end of tasks foreach
    }
    
   combineDateTime(date, time){
     date = new Date(date)
     console.log("inputs : " , date , time)
    let temp = time.split(/[: ]/)
    if (String(temp[2]) == "PM"){
      let adjusted = Number(temp[0]) + 12
      return new Date(date.getFullYear(),date.getMonth(), date.getDate(), adjusted,Number(temp[1]),0,0 )
    }
    else{
      return new Date(date.getFullYear(),date.getMonth(), date.getDate(), Number(temp[0]),Number(temp[1]),0,0 )
    }

}
   dateToTime(date){
     let str = date.toLocaleTimeString()
     let temp = str.split(/[: ]/)
     let time = String(temp[0]+":"+temp[1]+" "+temp[3])
     return time
   }

  }
  
  function getTaskIndex(array, taskToFind, dropped=false): any{
    /*
    console.log("Looking in array : " , array)
    console.log("looking for : " , taskToFind)*/
     for (let index = 0; index < array.length; index++) {
      const element = array[index];
      //TODO may need to make this more strict later
     /* console.log("Debug Index Getter")
      console.log("Element variables : " , element.title, element.start, element.end)
      console.log("task variables : " , taskToFind.title, taskToFind.start, taskToFind.end)
*/
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
