import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "./sorting-algorithm";
import {Subject} from "rxjs";
import {Bar} from "../../graph/bar";
import {Step} from "../../step";

@Injectable({
  providedIn: 'root'
})
export class BubbleSortAlgorithmService implements SortingAlgorithm {

  constructor() {
  }

  sort(bars: Bar[], resultEmitter: Subject<Step[]>): void {
    let result: Step[] = [];

    let size = bars.length;

    //bubble sort
    for (let i = 0; i < size - 1; i++) {
      for (let j = 1; j < size - i; j++) {
        if (bars[j - 1].value > bars[j].value) {
          //do swap
          this.swap(bars, j - 1, j, result);
        }
      }
    }

    resultEmitter.next(result);
  }

  private swap(bars: Bar[], start: number, end: number, result: Step[]): void {
    let newStep: Step = {
      i: start,
      j: end,
      swap: true
    };

    result.push(newStep);

    let temp = bars[start];
    bars[start] = bars[end];
    bars[end] = temp;
  }
}
