import { EventDetailsComponent } from './../event-details/event-details.component';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { EventsComponent } from '../events/events.component';
import { MatBottomSheet } from '@angular/material';
import { ScriptService } from './../../services/script.service';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ToolbarService } from './../../services/toolbar.service';
// declare var sm: any;
declare var events_script: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  hideMainNav: Boolean;
  test: String;
  isEventsPage: Boolean;
  @ViewChild(EventsComponent) events;
  @ViewChild('sidenav1') sidenav1;

  constructor(private toolbarService : ToolbarService,router: Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private scriptService : ScriptService) {
    // this.dataService.overview = this.overview;
    // this.overview.nativeElement.click();

    this.mobileQuery = media.matchMedia('(max-width: 950px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // console.log('inside nav end');


    // const bottomSheetRef = bottomSheet.open(SocialShareComponent, {
    //   ariaLabel: 'Share on social media'
    // });
    // this.hideMainNav = false;

     router.events.forEach((event) => {
      //  console.log('started router block');
      if (event instanceof NavigationStart) {
        // console.log('inside navigation start');
        // this.event_name = event.url.split('/')[1];
        this.test = event.url.split('/')[1];
        if(this.test == 'events'){
          // console.log(this.test);
          this.hideMainNav = true;
          this.isEventsPage = true;
          // console.log('scrpt');

        }
        else {
          this.hideMainNav = false;
          this.isEventsPage = false;
        }

        // console.log(this.hideMainNav);

      }
      if (event instanceof NavigationEnd) {

      }
    });
}
  openMainNav(){
    this.hideMainNav = false;
  }
  openEventsNav() {
    this.hideMainNav = true;
  }
  openSideNav() {
    return this.sidenav1;
  }
  toolbar(){
    this.toolbarService.toggleToolbarzIndex.emit(2);
    // console.log(this.zIndex);
  }
  // sayhello(){
  //   console.log('hello!!');
  // }
  ngOnInit() {
    // console.log('Events script requested');
    this.scriptService.load('events_script').then(data => {
     this.call_events_script();
  }).catch(error => console.log(error));
  }
  call_events_script(){
    // console.log("Events Script Called!");
    new events_script();
  }
  // ngAfterViewInit() {
  //   let node = document.createElement('script');
  //       node.src = '/assets/js/demo1.js';
  //       node.type = 'text/javascript';
  //       node.async = false;
  //       // node.id =id;
  //       node.charset = 'utf-8';
  //       document.getElementsByTagName('head')[0].appendChild(node);
  //   // child is sets
  //   // this.events.rotate();
  // }

}
