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

  sort(bars: Bar[], signalEmitter: Subject<Pair>): void {
  }
}
