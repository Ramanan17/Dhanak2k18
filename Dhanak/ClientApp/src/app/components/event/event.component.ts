import { eventnew } from './eventnew';
import { events } from './../events';
import { element } from 'protractor';
import { user } from './../../nav-menu/user';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

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

selectedevents:any;
isRegistered
disabled=false;
 Id='';
validateevents:eventnew[];

finalevent:eventnew[];


  constructor(public dataService:DataService,public route:Router,public auth:AuthService) {
    this.dataService.getEvents().subscribe(e => {this.validateevents=e})
   
    if(auth.isAuthenticated())
    {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
         
         // console.log(this.profile.name)
         // this.user.name=this.profile.name
         this.dataService.getUser(this.profile.name).
         subscribe(e =>{ this.user=e; this.dataService.getRegisteredevents(this.user.id).subscribe(m =>{this.selectedevents=m;
          this.dataService.getEvents().subscribe(e => {this.validateevents=e;
         for(let event of this.validateevents)
         {
           event.isRegistered=false;
         }
         for(let select of this.selectedevents)
         {
           for(let event of this.validateevents)
           {
             if(event.id==select.id)
             {
               event.isRegistered=true;
               break;
             }
           }
         }
        
        
       
        ;});
         

        });
         
       
       })
       
         // this.dataService.addUser(this.user).subscribe();
        });
      }
     
    }
    
   }
  
   onSpanClick()
   {
     this.display='none';
   }
   onBtnClick(id)
   {
    this.display='block';
   if(this.user.phone=="" || null)
   {
     this.hasPhoneNumber=false;
   }
   else
   {
     this.hasPhoneNumber=true;
   }
   this.dataService.getEvent(id).subscribe(e => {this.name=e.eventName,this.Id=e.eventId});
   

  // console.log(this.hasPhoneNumber)
  // console.log(this.auth.isAuthenticated())
  
   }
   Success(id)
   {
     
     // this.selectedevent=id;
      this.dataService.registerUser(this.user.id,id).subscribe();
      this.display='none';
      this.dataService.getEvent(id).subscribe(e => {this.selectedevents.push(e)});
     for(let event of this.validateevents)
     {
       if(event.id==id)
       {
         event.isRegistered=true;
       }
      
     }

      

   }
   onSubmit({value,valid})
   {
     this.user.phone=value.phone;
     this.userResource.name=this.user.name;
     this.userResource.phone=value.phone;
    // console.log(this.userResource);
    //  console.log(this.user)
      this.dataService.updateuser(this.userResource,this.user.id).subscribe();
      this.display='none';

   }

  ngOnInit() {
  }
}
