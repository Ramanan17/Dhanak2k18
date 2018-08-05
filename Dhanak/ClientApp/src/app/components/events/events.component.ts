import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  message: string = "Hola Mundo!";
  event_name: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('music') music:ElementRef;
  @ViewChild('dance') dance:ElementRef;
  @ViewChild('online') online:ElementRef;
  @ViewChild('literary') literary:ElementRef;
  @ViewChild('quiz') quiz:ElementRef;
  @ViewChild('informals') informals:ElementRef;
  @ViewChild('gaming') gaming:ElementRef;
  @ViewChild('arts') arts:ElementRef;
  
  @Output() messageEvent = new EventEmitter<string>();
  @Output() openNav = new EventEmitter();
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 950px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
   }
  sendMessage() {
    this.messageEvent.emit(this.message);
  }
  rotate(ev){
    // console.log(ev.target);
    // console.log(ev.target.parentNode);
    this.event_name = ev.target.parentNode.getAttribute('data-event-name') || ev.target.getAttribute('data-event-name');
    // console.log(this.event_name);
    this[this.event_name].nativeElement.click();
  }
  pulse(ev){
    // console.log(ev.target);
    // console.log(ev.target.parentNode);
    this.event_name = ev.target.parentNode.getAttribute('data-subevent-name') || ev.target.getAttribute('data-subevent-name');
    // console.log(this.event_name);
    this[this.event_name].nativeElement.click();
  }
  // click(str){
  //   console.log(str);
  //   console.log(this["dance"]);
    
  // }
  ngOnInit() {
    // console.log(this.dance);
  }

}
