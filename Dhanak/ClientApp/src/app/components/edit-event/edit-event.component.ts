import { category, events } from './../events';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { event } from '../new-event/event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit,AfterViewInit {

  Id:number;
  categoryid:number;
  validity:boolean=true;
  category:any[];
  cid:number;

  cName:string;
  rule:Object={
    rules:''
  }
  events:events = { eventName:'',rules:[{id:0,rules:''}],description:'',categoryId:{id:0,name:''},coOrdinator:{name:'',phone:''},organiser:{name:'',phone:'',email:''}}

  event:event = { eventName:'',rules:[{id:0,rules:''}],description:'',categoryId:0,coOrdinator:{name:'',phone:''},organiser:{name:'',phone:'',email:''}}


  constructor(private route: ActivatedRoute,private dataservice:DataService,public router:Router) {
    this.route.params.subscribe( params =>{ this.Id=params.id;this.dataservice.getEvent(this.Id).subscribe(res =>{this.events.eventName=res.eventName,this.events.description=this.event.description,this.events.coOrdinator=res.coOrdinator,this.events.organiser=res.organiser});
  } );
    this.dataservice.getEvent(this.Id).subscribe(res => {this.event=res,this.categoryid=res.categoryId});
    //this.categoryid=this.events.categoryId.toString();
    this.dataservice.getCategory().subscribe(res => this.category = res);


  }
   add()
   {


     this.event.rules.push(this.rule={rules:''});
   }
   delete(id)
   {
     this.event.rules.splice(id, 1);
     this.dataservice.deleteEvent(id).subscribe();
   }






   onSubmit({value,valid})
   {
        if(valid)
        {
          this.event.eventName=this.events.eventName;
          //this.event.categoryId=this.categoryid;
          this.event.coOrdinator=this.events.coOrdinator;
          this.event.organiser = this.events.organiser;
          this.event.description=this.events.description;


        //  console.log("pass")
          //console.log(this.event);
          this.dataservice.editEvents(this.event,this.Id).subscribe();
        }
        else{
          this.validity=false;
          console.log(value)
          console.log("fail");
        }
        this.router.navigate(['/data']);

   }


  ngOnInit() {
      }
  ngAfterViewInit()
  {
        }


}
