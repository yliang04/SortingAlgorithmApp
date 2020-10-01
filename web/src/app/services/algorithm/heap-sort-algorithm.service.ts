import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "./sorting-algorithm";
import {Subject} from "rxjs";
import {Bar} from "../../graph/bar";
import {Pair} from "../../pair";

@Injectable({
  providedIn: 'root'
})
export class HeapSortAlgorithmService implements SortingAlgorithm{

  constructor() { }

  sort(bars: Bar[], resultEmitter: Subject<Pair[]>): void {
    let n = bars.length;
    let result: Pair[] = [];

    for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(bars, n, i, result);
    }

    for(let i = n - 1; i > 0; i--) {
      this.swap(bars, 0, i, result);
      this.heapify(bars, i, 0, result);
    }

    resultEmitter.next(result);
  }

  private heapify(bars: Bar[], n: number, i: number, result: Pair[]): void {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if(left < n && bars[largest].value < bars[left].value) {
      largest = left;
    }

    if(right < n && bars[largest].value < bars[right].value) {
      largest = right;
    }

    if(largest != i) {
      this.swap(bars, i, largest, result);
      this.heapify(bars, n, largest, result);
    }
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
