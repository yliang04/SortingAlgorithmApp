import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "./sorting-algorithm";
import {Bar} from "../../graph/bar";
import {Subject} from "rxjs";
import {Step} from "../../step";

@Injectable({
  providedIn: 'root'
})
export class QuickSortAlgorithmService implements SortingAlgorithm {

  constructor() { }

  sort(bars: Bar[], resultEmitter: Subject<Step[]>): void {
    let result : Step[] = [];

    this.quickSort(bars, result, 0 , bars.length - 1);

    resultEmitter.next(result);
  }

  private quickSort(bars: Bar[], result: Step[], start: number, end: number) {
    let index = this.partition(bars, result, start, end);

      if(start < index - 1) {
        this.quickSort(bars, result, start, index - 1);
      }

      if(index < end) {
        this.quickSort(bars, result, index, end);
      }
  }

  private partition(bars: Bar[], result: Step[], start: number, end: number): number{
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

      if(start <= end) {
        this.swap(bars, start, end, result);
        start++;
        end--;
      }
    }

    return start;
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
