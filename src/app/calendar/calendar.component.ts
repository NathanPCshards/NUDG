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
      private taskService : taskService) {
  
    }
  ngOnInit(): void {
    //Pull existing tasks from the database
    this.initializeData()

    console.log("===debug===")
    console.log("this.events: ", this.events)
    console.log("this.displayEvents: "  ,this.displayEvents$)
    console.log("====end====")

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
      //debug this
      console.log("event time changed")
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
      this.handleEvent('Dropped or resized', event);
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      //I think this happens when the event is clicked and accordion thing opens
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
  addEvent(optionalObject=null)  {
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
          timeEnd: "1:00 PM"
    
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
      timeEnd: "1:00 PM"
    }
    this.displayEvents$.push(temp)
    console.log("checking display : " , this.displayEvents$)

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
      //Add the object that was passed as a parameter
      console.log("optionalObject : " , optionalObject)
      this.events = [
        ...this.events,
        optionalObject
      ]
      this.displayEvents$.push(optionalObject)
      this.refresh.next()
    }

     
    

      console.log("debug add")
      console.log("events : " , this.events)
      console.log("display E : " , this.displayEvents$)
    }
  
  async deleteEvent(eventToDelete: CalendarEvent) {
    console.log("display events before delete : " , this.displayEvents$)
    //getting index of event to delete
    let taskIndex = getTaskIndex(this.displayEvents$, eventToDelete)
    //Remove from display list
    this.displayEvents$.splice(taskIndex,1)

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
      console.log("debug pressed")
      console.log("display List : ", this.displayEvents$)
      console.log("event list : " , this.events)
      this.tasks$.forEach(element => {
        console.log("Tasks list: ", element)
      });

 
    }

    initializeData(){
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

      this.displayEvents$ = []
      this.events = []
      this.tasks$ = this.taskService.fetchAll();
      this.tasks$.subscribe(element => {
        element.forEach(task => {
          //template out a object to put the DB info into
          let eventFromDB = {
            title: task.title,
            start: task.dateStart,
            end: task.dateEnd,
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
            timeEnd: task.timeEnd
          }
          //put object in lists
          //this.displayEvents$.push(eventFromDB)
          this.addEvent(eventFromDB)
        });
      }); //end of tasks foreach
    }

     update(event, index, optional=""){
      let temp;
      console.log("time end value : " , optional)
      console.log("event : " , event)
      this.tasks$.forEach(async element => {
        //update the entry and temp save it
        element[index].title = event.title
        element[index].dateStart = event.start
        element[index].dateEnd = event.end
        //TODO This can be cleaned up to not have the conditional check (just use 1 variable)
        event.colorPrimary ?  element[index].colorPrimary = event.colorPrimary  : element[index].colorPrimary = event.color.primary
        event.colorSecondary ?  element[index].colorSecondary = event.colorSecondary  : element[index].colorSecondary = event.color.secondary
        element[index].timeStart = event.timeStart
        element[index].timeEnd = event.timeEnd
        temp = element[index]
        //update called
        await this.taskService.update(temp).toPromise()
      });

       //this.initializeData(); but without clearing the displayed events list
       this.events = []
       this.tasks$ = this.taskService.fetchAll();
       this.tasks$.subscribe(element => {
         element.forEach(task => {
           //template out a object to put the DB info into
           let eventFromDB = {
             title: task.title,
             start: task.dateStart,
             end: task.dateEnd,
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
             timeEnd: task.timeEnd
           }
           //put object in lists
           this.events.push(eventFromDB)
         });

       }); //end of tasks foreach
       console.log("end of update")
       console.log("display List : ", this.displayEvents$)
       console.log("event list : " , this.events)
       console.log("-------------------")
       this.refresh.next()
    }

  }
  
  function getTaskIndex(array, taskToFind): any{
    console.log("array : " , array)
    console.log("task to taskToFind : " , taskToFind)
  
     for (let index = 0; index < array.length; index++) {
      const element = array[index];
      //TODO may need to make this more strict later
      console.log("Debug Index Getter")
      console.log("Element variables : " , element.title, element.start, element.end)
      console.log("task variables : " , taskToFind.title, taskToFind.start, taskToFind.end)

      if (element.title == taskToFind.title && element.start == taskToFind.start && element.end == taskToFind.end){
        return index
      }
      
    }
    return -1




  }
