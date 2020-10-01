import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Bar} from "./bar";
import {GraphService} from "../services/graph.service";
import {Observable} from "rxjs";
import {AlgorithmService} from "../services/algorithm.service";
import {Pair} from "../pair";

//time delay of each animation frame in millisecond
const FRAME_DELAY: number = 50;

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

  @Output() animationFinished = new EventEmitter<void>();

  constructor(private graphService: GraphService, private algorithmService: AlgorithmService) {
    this.subscription = algorithmService.result.subscribe(result => this.processResult(result));
  }

  ngOnInit(): void {
    this.createBars();
    this.randomize.subscribe(() => this.randomizeArray());
    this.sort.subscribe(() => this.sortArray());

    //Deprecated. Do nothing.
    this.swap.subscribe();
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

  private sortArray(): void {
    this.algorithmService.algorithmChoice = this.selectedAlgorithm;

    /**
     * Note: IMPORTANT!! provide a clone of the array
     */
    this.algorithmService.sort(this.bars);
  }

  /**
   * Turn result into streams of actions/animation
   */
  private processResult(result: Pair[]) {
    let counter = 0;

    for (let pair of result) {
      if(pair.swap) {
        counter = this.doSwap(pair, counter);
      }
      else {
        counter = this.doHighlight(pair, counter);
      }
    }

    //notify parent that animation is finished
    setTimeout(() => {
      this.animationFinished.next();
    }, FRAME_DELAY * counter);
  }

  private doSwap(pair: Pair, counter: number): number {
    setTimeout(() => {
      this.bars[pair.i].highlighted = true;
      this.bars[pair.j].highlighted = true;
    }, FRAME_DELAY * counter);

    counter++;

    setTimeout(() => {
      let temp = this.bars[pair.i];
      this.bars[pair.i] = this.bars[pair.j];
      this.bars[pair.j] = temp;
    }, FRAME_DELAY * counter);

    counter++;

    setTimeout(() => {
      this.bars[pair.i].highlighted = false;
      this.bars[pair.j].highlighted = false;
    }, FRAME_DELAY * counter);

    return counter;
  }

  private doHighlight(pair: Pair, counter: number): number {
    setTimeout(() => {
      this.bars[pair.i].highlighted = true;
    }, FRAME_DELAY * counter);

    counter++;

    setTimeout(() => {
      this.bars[pair.i].value = pair.j;
    }, FRAME_DELAY * counter);

    counter++;

    setTimeout(() => {
      this.bars[pair.i].highlighted = false;
    }, FRAME_DELAY * counter);

    counter++;

    return counter;
  }
}
