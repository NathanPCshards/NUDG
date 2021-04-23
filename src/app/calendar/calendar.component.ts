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
    time;
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
    this.tasks$ = this.taskService.fetchAll();
    this.tasks$.subscribe(element => {
      element.forEach(task => {
        //template out a object to put the DB info into
        let eventFromDB = {
          title: task.title,
          start: task.start,
          end: task.end,
          color: {
              primary: task.colorPrimary,
              secondary: task.colorSecondary
          },
          draggable: false,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          }
        }
        //put object in lists
        this.displayEvents$.push(eventFromDB)
        this.events.push(eventFromDB)


      });
    }); //end of tasks foreach

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
  
    addEvent(): void {
      console.log("adding event")

      //Post a copy of 'blank' entry to DB
      this.tasks$ = this.taskService.post({ 
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      colorPrimary: this.colors.red.primary,
      colorSecondary: this.colors.red.secondary,
      draggable: false,
      resizableBeforeStart: true,
      resizableAfterEnd: true
})

      //necessary subscribe for observable.
      this.tasks$.forEach(element => {
        this.displayEvents$.push(element)
      });

      //Add a generic new entry to events array
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
  
    deleteEvent(eventToDelete: CalendarEvent) {
      //TODO call delete here for DB
      this.events = this.events.filter((event) => event !== eventToDelete);
    }
  
    setView(view: CalendarView) {
      this.view = view;
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
  
  
  
    debugEvent(){
    //  console.log("All Event Info, and refresh testing")
      
      //this.refresh.next()
    
    //  this.events.forEach(event => console.log(event));
    //  this.displayEvents$.forEach(event=>console.log(event))

 
    }

/*
    fetchAllTasks(): Observable<any[]> {
      return this.taskService.fetchAll();
    }
    postTask(object:any): void{
      this.taskService
      .post(object)
      .pipe(tap(() => (this.tasks$ = this.fetchAllTasks())));
    }
    updateTask(object: any): void {
    this.taskService
        .update(object)
        .pipe(tap(() => (this.tasks$ = this.fetchAllTasks())));
    }
    deleteTask(id: any): void {
      this.tasks$ = this.taskService
        .delete(id)
        .pipe(tap(() => (this.tasks$ = this.fetchAllTasks())));
        
    }
  
  
*/






  }
  
  