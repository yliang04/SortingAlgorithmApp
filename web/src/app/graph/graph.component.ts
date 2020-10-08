import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Bar} from "./bar";
import {GraphService} from "../services/graph.service";
import {Observable} from "rxjs";
import {AlgorithmService} from "../services/algorithm.service";
import {Step} from "../step";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy{

  private _size = 0;

  bars: Bar[];
  subscription: any;

  //time delay of each animation frame in millisecond
  @Input() speed: number;


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
  private processResult(result: Step[]) {
    let counter = 0;

    for (let step of result) {
      if(step.swap) {
        counter = this.doSwap(step, counter);
      }
      else {
        counter = this.doHighlight(step, counter);
      }
    }

    //notify parent that animation is finished
    setTimeout(() => {
      this.animationFinished.next();
    }, this.speed * counter);
  }

  private doSwap(step: Step, counter: number): number {
    setTimeout(() => {
      this.bars[step.i].highlighted = true;
      this.bars[step.j].highlighted = true;
    }, this.speed * counter);

    counter++;

    setTimeout(() => {
      let temp = this.bars[step.i];
      this.bars[step.i] = this.bars[step.j];
      this.bars[step.j] = temp;
    }, this.speed * counter);

    counter++;

    setTimeout(() => {
      this.bars[step.i].highlighted = false;
      this.bars[step.j].highlighted = false;
    }, this.speed * counter);

    return counter;
  }

  private doHighlight(step: Step, counter: number): number {
    setTimeout(() => {
      this.bars[step.i].highlighted = true;
    }, this.speed * counter);

    counter++;

    setTimeout(() => {
      this.bars[step.i].value = step.j;
    }, this.speed * counter);

    counter++;

    setTimeout(() => {
      this.bars[step.i].highlighted = false;
    }, this.speed * counter);

    counter++;

    return counter;
  }
}
