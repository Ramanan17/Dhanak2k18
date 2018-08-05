import { DataService } from './../../services/data.service';
import {event} from './event'
import { FetchDataComponent } from './../../fetch-data/fetch-data.component';
import { events, organiser, category } from './../events';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  category:any[];
  validity:boolean=true;
  rules :any[];
  rule:any;

  events:events = { eventName:'',rules:[{rules:''}],description:'',categoryId:{id:0,name:''},coOrdinator:{name:'',phone:''},organiser:{name:'',phone:'',email:''}}



  constructor(public dataservice:DataService,private router:Router )
  {
    this.dataservice.getCategory().subscribe(c => this.category=c)
    this.events.rules.push(this.rule={rules:""})

  }

    ngOnInit() {

  }
  add()
  {


    this.events.rules.push(this.rule={rules:''});

  }
  delete(id)
  {
    this.events.rules.splice(id,1);
  }

  onSubmit({value,valid})
  {
     if(valid)
     {
    this.dataservice.addEvents(this.events).subscribe();
    this.router.navigate(['/data']);
console.log(this.events)
     }
    else{

       this.validity=false;
    }
  }


}
