import { user } from './../../nav-menu/user';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

 events:any;
 profile:any;
 user:any;
display='none';
phone='';
hasPhoneNumber=false;
userResource={
  name:'',
  phone:''

};

  constructor(public dataService:DataService,public route:Router,public auth:AuthService) {
    this.dataService.getEvents().subscribe(e => {this.events=e,console.log(this.events)})
    if(auth.isAuthenticated())
    {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
         
         // console.log(this.profile.name)
         // this.user.name=this.profile.name
         this.dataService.getUser(this.profile.name).subscribe(e =>{this.user=e,console.log(this.user)
       
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
   onBtnClick()
   {
   if(this.user.phone=="")
   {
     this.hasPhoneNumber=false;
   }
   else
   {
     this.hasPhoneNumber=true;
   }
  // console.log(this.hasPhoneNumber)
  // console.log(this.auth.isAuthenticated())
    this.display='block';
   }
   Success(id)
   {
       console.log(id);
   }
   onSubmit({value,valid})
   {
     this.user.phone=value.phone;
     this.userResource.name=this.user.name;
     this.userResource.phone=value.phone;
    // console.log(this.userResource);
    //  console.log(this.user)
      this.dataService.updateuser(this.userResource,this.user.id).subscribe();
      this.display='block';
   }

  ngOnInit() {
  }
}
