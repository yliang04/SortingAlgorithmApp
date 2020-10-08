import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "./sorting-algorithm";
import {Bar} from "../../graph/bar";
import {Subject} from "rxjs";
import {Step} from "../../step";

@Injectable({
  providedIn: 'root'
})
export class MergeSortAlgorithmService implements SortingAlgorithm{

  constructor() { }

  sort(bars: Bar[], resultEmitter: Subject<Step[]>): void {
    let helper: Bar[] = [];
    let result: Step[] = [];

    this.mergeSort(bars, helper, 0, bars.length - 1, result);

    resultEmitter.next(result);
  }

  private mergeSort(bars: Bar[], helper: Bar[], start: number, end: number, result: Step[]): void {
    if(start < end) {
      /**
       * Note: IMPORTANT!! Need to use Math.floor() here to get index as integer
       */
      let mid = Math.floor((start + end) / 2);

      this.mergeSort(bars, helper, start, mid, result);
      this.mergeSort(bars, helper, mid + 1, end, result);
      this.merge(bars, helper, start, mid, end, result);
    }
  }

  private merge(bars: Bar[], helper: Bar[], start: number, mid: number, end: number, result: Step[]): void {
    for(let i = start; i <= end; i++) {
      helper[i] = bars[i];
    }

    let helperLeft = start;
    let helperRight = mid + 1;
    let current = start;

    while(helperLeft <= mid && helperRight <= end) {
      if(helper[helperLeft].value < helper[helperRight].value) {
        bars[current] = helper[helperLeft];
        helperLeft++;

        //add to result
        this.addToResult(result, current, bars[current].value);
      }
      else {
        bars[current] = helper[helperRight];
        helperRight++;

        //add to result
        this.addToResult(result, current, bars[current].value);
      }

      current++;
    }

    let remain = mid - helperLeft;

    for(let i = 0; i <= remain; i++) {
      bars[current + i] = helper[helperLeft + i];

      //add to result
      this.addToResult(result, current + i, bars[current + i].value)
    }
  }

  private addToResult(result: Step[], index: number, value: number) {
    let step: Step = {
      i: index,
      j: value,
      swap: false
    };

    result.push(step);
  }
}
