import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "../../sorting-algorithm";
import {Bar} from "../../bar";
import {Subject} from "rxjs";
import {Pair} from "../../pair";

@Injectable({
  providedIn: 'root'
})
export class MergeSortAlgorithmService implements SortingAlgorithm{

  constructor() { }

  sort(bars: Bar[], resultEmitter: Subject<Pair[]>): void {
    let helper: Bar[] = [];
    let result: Pair[] = [];

    console.log("**start sort");
    this.mergeSort(bars, helper, 0, bars.length - 1, result);
    console.log("***end sort: " + result.length);

    resultEmitter.next(result);
  }

  private mergeSort(bars: Bar[], helper: Bar[], start: number, end: number, result: Pair[]): void {
    if(start < end) {
      /**
       * Note: IMPORTANT!! Need to use Math.floor() here to get index as integer
       */
      let mid = Math.floor(start + (end - start) / 2);

      this.mergeSort(bars, helper, start, mid, result);
      this.mergeSort(bars, helper, mid + 1, end, result);
      this.merge(bars, helper, start, mid, end, result);
    }
  }

  private merge(bars: Bar[], helper: Bar[], start: number, mid: number, end: number, result: Pair[]): void {
    for(let i = start; i <= end; i++) {
      helper[i] = bars[i];
    }

    let helperLeft = start;
    let helperRight = mid + 1;
    let counter = start;

    while(helperLeft <= mid && helperRight <= end) {
      if(helper[helperLeft].value < helper[helperRight].value) {
        bars[counter] = helper[helperLeft];
        helperLeft++;

        //add to result
        this.addToResult(result, counter, bars[counter].value);
      }
      else {
        bars[counter] = helper[helperRight];
        helperRight++;

        //add to result
        this.addToResult(result, counter, bars[counter].value);
      }

      counter++;
    }

    let remain = mid - helperLeft;

    while(remain >= 0) {
      bars[counter] = helper[helperLeft + remain];

      //add to result
      this.addToResult(result, counter, bars[counter].value);

      remain--;
      counter++;
    }
  }

  private addToResult(result: Pair[], index: number, value: number) {
    let pair: Pair = {
      i: index,
      j: value,
      swap: false
    };

    result.push(pair);
  }
}
