import { Injectable, EventEmitter } from '@angular/core';
 
import { Observable, of } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  toggleToolbarzIndex: EventEmitter<Number> = new EventEmitter<Number>();
  constructor() {
    this.toggleToolbarzIndex.emit(2);
    // this.categoryListEdited = 3;
  }
}