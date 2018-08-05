// import { ScriptService } from './../script.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ScriptService } from '../services/script.service';
import { ToolbarService } from '../services/toolbar.service';

declare var easing: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('sidenav1') sidenav1;

  constructor(private toolbarService : ToolbarService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private scriptService : ScriptService) {
    this.mobileQuery = media.matchMedia('(max-width: 950px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  //   this.toolbarService.categoryListEdited.subscribe(data => {
  //     console.log('something was changed in category-list-edit');
  // });
  this.toolbarService.toggleToolbarzIndex.emit(2);

   }
   openSideNav() {
    return this.sidenav1;
  }

  ngOnInit() {
    console.log('home script requested');
    this.scriptService.load('fittext', 'easing').then(data => {
      this.call_home_script();
  }).catch(error => console.log(error));
  }
  toolbar(){
    this.toolbarService.toggleToolbarzIndex.emit(2);
    // console.log(this.zIndex);
  }
  call_home_script(){
    new easing();
  }

}
