import { category } from './../components/events';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import {MatButtonModule, MatCheckboxModule,MatFormFieldModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { eventnew } from '../components/event/eventnew';
import { Observable } from 'rxjs/internal/Observable';
import {FormControl} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { user } from '../nav-menu/user';

@Component({
  selector: 'app-organsisers',
  templateUrl: './organsisers.component.html',
  styleUrls: ['./organsisers.component.css']
})
export class OrgansisersComponent implements OnInit {
 events:eventnew[];
 selected:eventnew;
 users:user;
 isSelected:boolean;
 filteredevents: Observable<eventnew[]>;
 validate:Observable<any[]>;
 myControl = new FormControl();
 categories:category[];
 selectedEvents:any[];
  constructor(public auth:AuthService,public route:Router,public dataservice:DataService) {
    this.dataservice.getEvents().subscribe(res => {this.selectedEvents=res});
    this.dataservice.getCategory().subscribe(res => {this.categories=res});
   // this.dataservice.getRegisteredUsers(3).subscribe(res => {console.log(res)});
    this.filteredevents = this.dataservice.getEvents();
      }

  ngOnInit() {
    
  }
  private _filterStates(value: string): eventnew[] {
    const filterValue = value.toLowerCase();

    return this.events.filter(state => state.eventName.toLowerCase().indexOf(filterValue) === 0);
  }
  SelectedEvent(event:any)
  {

   // console.log(event.option.value);
    var events:eventnew;
    for(let name of this.events)
    {
      if(name.eventName==event.option.value)
      {
        events = name;
      }
        
    }
    this.isSelected=true;
    this.dataservice.getRegisteredUsers(events.id).subscribe(res => this.users=res);
   //console.log(events);
  }
  SelectedCategory(category:any)
  {
    this.selectedEvents=[];
    this.filteredevents.subscribe(res =>{ this.events =res;
     for(let event of this.events)
    {
      if(category.option.value== event.category.name)
      {
            this.selectedEvents.push(event)
      }

       } })
   
     
  }
 OnSubmit({value,valid})
 {
   if(valid)
   {
     console.log(value);
   }
 }

}
