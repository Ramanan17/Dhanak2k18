import { Observable } from 'rxjs';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { user } from './user';
import { eventnew } from '../components/event/eventnew';
import { MediaMatcher } from '@angular/cdk/layout';
import { ToolbarService } from '../services/toolbar.service';




@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  interval:any;
  profile: any;
  interval2:any;
//  user:user={name:'',phone:''}
users:user={

  name:'',
  phone:''
};
user:any;
  canShow=false;
selectedevents:any;
isRegistered
disabled=false;
 Id='';
validateevents:eventnew[];

finalevent:eventnew[];
category:any[];
id:''

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
    // @ViewChild('btn') main;
    mobileQuery: MediaQueryList;
    click2;
    // displ;
    zIndex;
    // private toolbarService: ToolbarService;
    private _mobileQueryListener: () => void;

  constructor(private route:Router,public auth:AuthService,public dataservice:DataService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private toolbarService: ToolbarService)
  {
    this.mobileQuery = media.matchMedia('(max-width: 950px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.displ=false;
    // this.zIndex = this.toolbarService.get();
    this.zIndex = 2;
    this.toolbarService.toggleToolbarzIndex.subscribe(data => {
      // console.log('something was changed in category-list-edit');
      this.zIndex = data;
  });

   // console.log(auth.isAuthenticated());
   auth.handleAuthentication();


  }
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;

    } else {

      this.auth.getProfile((err, profile) => {
        this.profile = profile;

        console.log(this.profile.name)
        this.users.name=this.profile.name
        this.dataservice.addUser(this.users).subscribe();
      });
      //this.profile=this.auth.userImageChange$

    }
    this.refreshData();
    this.interval = setInterval(() => {
        this.refreshData();
        this.auth.getProfile
    }, 500);

  }
  ngAfterViewInit()
  {

  }
  refresh2Data()
  {


  }
  refreshData()
  {
    this.auth.handleAuthentication();


  }
  click()
  {
    var dataService:DataService
    var auth:AuthService;
    this.isExpanded = false;
    if(auth.isAuthenticated())
    {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;

      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;

         // console.log(this.profile.name)
         // this.user.name=this.profile.name
         dataService.getUser(this.profile.name).
         subscribe(e =>{ this.user=e; dataService.getRegisteredevents(this.user.id).subscribe(m =>{this.selectedevents=m;
          dataService.getEvents().subscribe(e => {this.validateevents=e;
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



        ;this.canShow=true});


        });


       })

         // this.dataService.addUser(this.user).subscribe();
        });
      }

    }
    this.route.navigate(["/event"]);

  }
  onActivate(componentRef){
    this.click2 = componentRef.openSideNav();
    // console.log(componentRef);
  }

  edit(){
    //edits made here
    this.toolbarService.toggleToolbarzIndex.emit(-2);
    // console.log(this.zIndex);
}

  ngOnDestroy()
  {

  }

}
