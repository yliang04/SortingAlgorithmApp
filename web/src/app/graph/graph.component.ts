import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Bar} from "../bar";
import {GraphService} from "../services/graph.service";
import {animationFrameScheduler, Observable} from "rxjs";
import {AlgorithmService} from "../services/algorithm.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy{

  private _size = 0;

  bars: Bar[];
  subscription: any;

  @Input()
  get size(): number { return this._size}
  set size(size: number) {
    this._size = size;
    this.createBars();
  }

  @Input() selectedAlgorithm: string;

  @Input() randomize: Observable<void>;
  @Input() sort: Observable<void>;
  @Input() swap: Observable<void>;

  constructor(private graphService: GraphService, private algorithmService: AlgorithmService) {
    //this.subscription = algorithmService.swapSignal.subscribe(pair => this.swapBars(this.bars, pair.i, pair.j));

    this.subscription = algorithmService.swapSignal.subscribe(pair => this.swapBars(this.bars, pair.i, pair.j));
  }

  ngOnInit(): void {
    this.createBars();
    this.randomize.subscribe(() => this.randomizeArray());
    this.sort.subscribe(() => this.sortArray());
    this.swap.subscribe(() => this.swapBars(this.bars, 1, 15));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  private sortArray(): void {
    this.algorithmService.algorithmChoice = this.selectedAlgorithm;

    /**
     * Note: IMPORTANT!! provide a clone of the array
     */
    this.algorithmService.sort([...this.bars]);
  }

  private swapBars(bars: Bar[], i: number, j: number) {
    setTimeout(function() {
      bars[i].highlighted = true;
      bars[j].highlighted = true;
    }, 50);

    setTimeout(function() {
      let temp = bars[i];
      bars[i] = bars[j];
      bars[j] = temp;
    }, 100);

    setTimeout(function() {
      bars[i].highlighted = false;
      bars[j].highlighted = false;
    }, 100);
  }
}
