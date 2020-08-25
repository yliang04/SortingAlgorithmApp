import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Bar} from "../bar";
import {GraphService} from "../services/graph.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit{

  private _size = 0;

  bars: Bar[];
  @Input()
  get size(): number { return this._size}
  set size(size: number) {
    this._size = size;
    this.createBars();
  }

  @Input() randomize: Observable<void>;
  @Input() sort: Observable<void>;

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
    this.createBars();
    this.randomize.subscribe(() => this.randomizeArray());
  }

  private createBars(): void {
    this.graphService.createBars(this.size).subscribe(bars => this.bars = bars);
  }

  private randomizeArray(): void {
    this.graphService.randomizeArray(this.bars).subscribe(bars => this.bars = bars);
  }

  getBarWidth(containerWidth: number): string {
    return (containerWidth / this.size) + 'px';
  }
}
