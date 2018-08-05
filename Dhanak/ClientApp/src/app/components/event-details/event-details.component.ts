import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { eventnew } from '../event/eventnew';
import { event } from '../new-event/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event_name;
  event;
  sample_data = [{event_name:'dance',
                  overview:'Something about Solo Singing',
                  rules:'Something about Solo Singing'},
                 {event_name:'10',
                  overview:'Something about Group Dance',
                  rules:'Something about Group Dance'},
                  {event_name:'43',
                  overview:'Somathing about battle of bands',
                  rules:'Somathing about battle of bands'},
                  {event_name:'9',
                  overview:'Somathing about battle of bands',
                  rules:'Somathing about battle of bands'},
                  {event_name:'5',
                  overview:'Somathing about battle of bands',
                  rules:'Somathing about battle of bands'},];
  // _route: any;
  events:any;
 profile:any;
 user ={
id:'',
name:'',
phone:''

};
display='none';
phone='';
hasPhoneNumber=false;
userResource={
  name:'',
  phone:''

};
name='';
canShow=false;
selectedevents:any;
isRegistered
disabled=false;
 Id='';
validateevents:eventnew[];
dbevent:event = { eventName:'',rules:[{id:0,rules:''}],description:'',categoryId:0,coOrdinator:{name:'',phone:''},organiser:{name:'',phone:'',email:''}}

finalevent:eventnew[];
category:any[];

public isCollapsed = false;
public canshow=false;
  constructor(private _route:ActivatedRoute ,public  router:Router,public dataService:DataService,public auth:AuthService) {
    // console.log(data);
    // setTimeout(function(){
    //   data.event = 'yoooo';
    //   console.log('done');
    // },5000)

    this._route.params.subscribe(params => {
      console.log(params['event-name']);
      this.event_name = params['event-name'];
      this.event =  this.sample_data.find(o => o.event_name === this.event_name);
      this.dataService.getEvent(this.event_name).subscribe(e1 => {this.dbevent = e1;console.log(this.dbevent)})
      if(auth.isAuthenticated())
      {
        if (this.auth.userProfile) {
          this.profile = this.auth.userProfile;

        } else {
          this.auth.getProfile((err, profile) => {
            this.profile = profile;
          // console.log(this.profile.name)
           // this.user.name=this.profile.name

           this.dataService.getUser(this.profile.name).subscribe(e => {this.user =e;if(this.user.phone=="" || null){
             this.hasPhoneNumber=false;
           }
           else
           {
             this.hasPhoneNumber=true;
           }
            this.dataService.checkRegisterd(this.user.id,this.event_name).subscribe(r => {console.log(r);this.canshow=r})})
           // this.dataService.addUser(this.user).subscribe();
          });
        }

      }

    });

    // setTimeout(function(){
    //   console.log(this.event);
    // },5000);


    // this.route.params.subscribe( params => { this.event_name = params['event_name'];console.log(params);} ) ;

  //   router.events.subscribe((val) => {
  //     // see also
  //     console.log(val)
  // });
    // router.events.forEach((event) => {
    //   if (event instanceof NavigationStart) {
    //     this.event_name = event.url.split('/')[1];
    //     // console.log(this.event_name);
    //     if(this.event_name){
    //       this.event=  this.sample_data.find(o => o.event_name === this.event_name);
    //       // this.event = "hello";
    //       // console.log(this.event);
    //       console.log('used for each');
    //       }
    //   }
    // });
   }

  ngOnInit() {
  }

}
