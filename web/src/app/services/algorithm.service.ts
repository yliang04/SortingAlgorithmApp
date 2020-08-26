import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Bar} from "../bar";
import {Pair} from "../pair";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  private source = new Subject<any>();
  public swapSignal = this.source.asObservable();

  constructor() { }

  private emitSignal(a: number, b: number): void {
    let pair: Pair = {
      i: a,
      j: b
    };

    this.source.next(pair);
  }

  sort(bars: Bar[]): void {
    //sort on a clone of the target array
    this.bubbleSort([...bars]);
  }

  bubbleSort(bars: Bar[]): void {
    let size = bars.length;
    let counter = 0;
    let signalSource = this.source;

    for(let  i = 0; i < size - 1; i++) {
      for(let j = 1; j < size - i; j++) {
        if(bars[j - 1].value > bars[j].value) {
          counter++;

          //emit swap steps to the actual array outside
          setTimeout(function() {
            let pair: Pair = {
              i: j - 1,
              j: j
            };

            signalSource.next(pair);
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
