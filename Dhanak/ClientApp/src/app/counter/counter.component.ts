
import { Component } from '@angular/core';
import { Client } from '../services/Client';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  clients:Client[];
  constructor()
  {
           
  }
  public incrementCounter() {
    this.currentCount++;
  }
}
