import { auth } from 'firebase/app';
import { event } from './../components/new-event/event';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  interval:any;
  // tslint:disable-next-line:whitespace
  events:any[];
   // tslint:disable-next-line:whitespace
  constructor(public dataService:DataService,public route:Router) {
    this.dataService.getEvents().subscribe(e => {this.events = e});
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,



    };
    // tslint:disable-next-line:whitespace
     // tslint:disable-next-line:whitespace
     // tslint:disable-next-line:whitespace
   }

  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => {
        this.refreshData();
    }, 1000);
     // tslint:disable-next-line:whitespace

  }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  refreshData()
  {
    this.dataService.getEvents().subscribe(e => {this.events = e});

  }
  onDelete(id,name)
  {
    var e = this.events.find(x => x.eventName==name);
    var index = this.events.indexOf(e);
    this.events.splice(index,1);


    return this.dataService.deleteEvent(id).subscribe();

  }
  onClick(id) {
    this.route.navigate(['/edit/' + id]);

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
