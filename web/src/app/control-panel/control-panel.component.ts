import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  @Input() size: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
