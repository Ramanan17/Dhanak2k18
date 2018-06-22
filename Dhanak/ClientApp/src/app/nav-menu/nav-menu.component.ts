import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { user } from './user';




@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  profile: any;
  user:user={name:'',phone:''}
  
  constructor(public afAuth: AngularFireAuth,private route:Router,public auth:AuthService,public dataservice:DataService)
  {
   // console.log(auth.isAuthenticated());
   auth.handleAuthentication();
  }
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
       
       // console.log(this.profile.name)
        this.user.name=this.profile.name
        this.dataservice.addUser(this.user).subscribe();
      });
    }
  }
}
