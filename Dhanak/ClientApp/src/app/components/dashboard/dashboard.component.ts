import { DataService } from './../../services/data.service';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { eventnew } from '../event/eventnew';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

profile:any;
user:any;
RegisteredEvents:eventnew[];
interval:any;
  constructor(public auth:AuthService,public dataservice:DataService) {
if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      
      
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.dataservice.getUser(this.profile.name).
        subscribe(e => {this.user=e;this.dataservice.getRegisteredevents(this.user.id).
          subscribe(r => {this.RegisteredEvents=r;console.log(this.RegisteredEvents)})})
      });
    }


   
   }
   delete(id)
   {
     var event;
    for(let e of this.RegisteredEvents)
    {
      if(e.id==id)
      {
          event=e;
          break;
      }
    }
    var index =this.RegisteredEvents.indexOf(event)
    this.RegisteredEvents.splice(index,1);
   // console.log(this.RegisteredEvents)
   this.dataservice.deleteRegisteredEvent(this.user.id,event.id).subscribe();
   }

  ngOnInit() {
    

    this.interval = setInterval(() => { 
      this.refreshData(); 
      this.auth.getProfile
  }, 1000);
 

  }
  refreshData()
  {
    this.dataservice.getUser(this.profile.name).
    subscribe(e => {this.user=e;this.dataservice.getRegisteredevents(this.user.id).
      subscribe(r => {this.RegisteredEvents=r;})})
 
  }

}
