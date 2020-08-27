import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "../../sorting-algorithm";
import {Bar} from "../../bar";
import {Subject} from "rxjs";
import {Pair} from "../../pair";

@Injectable({
  providedIn: 'root'
})
export class QuickSortAlgorithmService implements SortingAlgorithm {

  constructor() { }

  sort(bars: Bar[], resultEmitter: Subject<Pair[]>): void {
    let result : Pair[] = [];

    console.log("***Start quick sort");
    this.quickSort(bars, result, 0 , bars.length - 1);


    console.log("***return result:" + result.length);
    resultEmitter.next(result);
  }

  private quickSort(bars: Bar[], result: Pair[], start: number, end: number) {
    let index = this.partition(bars, result, start, end);

      if(start < index - 1) {
        this.quickSort(bars, result, start, index - 1);
      }

      if(index < end) {
        this.quickSort(bars, result, index, end);
      }
  }

  private partition(bars: Bar[], result: Pair[], start: number, end: number): number{
    /**
     * Note: IMPORTANT!! Need to use Math.floor() here to get index as integer
     */
    let pivot = bars[Math.floor(start + (end - start) / 2)].value;

    while(start <= end) {
      while(bars[start].value < pivot) {
        start++;
      }

      while(bars[end].value > pivot) {
        end--;
      }

      console.log(bars[start].value + " " + bars[end].value);

      if(start <= end) {
        this.swap(bars, start, end, result);
        start++;
        end--;
      }
    }

    return start;
  }

  private swap(bars: Bar[], start: number, end: number, result: Pair[]): void {
    let newPair: Pair = {
      i: start,
      j: end,
      swap: true
    };

    result.push(newPair);

    let temp = bars[start];
    bars[start] = bars[end];
    bars[end] = temp;
  }
}
