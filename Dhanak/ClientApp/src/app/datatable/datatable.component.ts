import { event } from './../components/new-event/event';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../services/data.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  // tslint:disable-next-line:whitespace
  events:any[];
   // tslint:disable-next-line:whitespace
  constructor(public dataService:DataService,public route:Router) {
    this.dataService.getEvents().subscribe(e => {this.events = e});
    // tslint:disable-next-line:whitespace 
     // tslint:disable-next-line:whitespace
     // tslint:disable-next-line:whitespace
   }

  ngOnInit() {
     // tslint:disable-next-line:whitespace
      
  }
  onDelete(id)
  {
    var e = this.events.find(x => x.id==id);
    this.events.splice(e,1);
    console.log('CLICKED');

    return this.dataService.deleteEvent(id).subscribe();
  
  }
  onClick(id) {
    this.route.navigate(['/edit/' + id]);

  }

}
