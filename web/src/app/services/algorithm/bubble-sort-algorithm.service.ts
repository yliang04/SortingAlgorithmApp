import { Injectable } from '@angular/core';
import {SortingAlgorithm} from "../../sorting-algorithm";
import {Subject} from "rxjs";
import {Bar} from "../../bar";
import {Pair} from "../../pair";

@Injectable({
  providedIn: 'root'
})
export class BubbleSortAlgorithmService implements SortingAlgorithm {

  constructor() {
  }

  sort(bars: Bar[], signalEmitter: Subject<Pair>): void {
    let size = bars.length;
    let counter = 0;

    for (let i = 0; i < size - 1; i++) {
      for (let j = 1; j < size - i; j++) {
        if (bars[j - 1].value > bars[j].value) {
          counter++;

          //emit swap steps to the actual array outside
          setTimeout(function () {
            let pair: Pair = {
              i: j - 1,
              j: j
            };

            signalEmitter.next(pair);
          }, counter * 100);

          //this.emitSignal(j - 1, j);

          //do swap
          let temp = bars[j - 1];
          bars[j - 1] = bars[j];
          bars[j] = temp;
        }
      }
    }
  }
}
