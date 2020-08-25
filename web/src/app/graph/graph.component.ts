import {Component, Input, OnInit} from '@angular/core';
import {Bar} from "../bar";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  bars: Bar[];
  @Input() barNum: number;

  constructor() { }

  ngOnInit(): void {
  }

}
