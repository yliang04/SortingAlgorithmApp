import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  @Input() size: number = 20;
  randomizeEventSubject: Subject<void>  = new Subject<void>();
  sortEventSubject: Subject<void>  = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  randomize(): void {
    this.randomizeEventSubject.next();
  }

  sort(): void {
    this.sortEventSubject.next();
  }
}
