import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Bar} from "../graph/bar";
import {AlgorithmList} from "./algorithm/algorithm-list";
import {SortingAlgorithm} from "./algorithm/sorting-algorithm";
import {BubbleSortAlgorithmService} from "./algorithm/bubble-sort-algorithm.service";
import {MergeSortAlgorithmService} from "./algorithm/merge-sort-algorithm.service";
import {QuickSortAlgorithmService} from "./algorithm/quick-sort-algorithm.service";
import {Pair} from "../pair";
import {HeapSortAlgorithmService} from "./algorithm/heap-sort-algorithm.service";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  private resultSource = new Subject<Pair[]>();

  private currentAlgorithm: SortingAlgorithm;
  private _algorithmChoice: string;

  public result = this.resultSource.asObservable();

  get algorithmChoice(): string {
    return this._algorithmChoice;
  }

  set algorithmChoice(choice: string) {
    this._algorithmChoice = choice;

    switch (choice) {
      case AlgorithmList.Bubble:
        this.currentAlgorithm = this.bubbleSortAlgorithmService;
        break;
      case AlgorithmList.Merge:
        this.currentAlgorithm = this.mergeSortAlgorithmService;
        break;
      case AlgorithmList.Quick:
        this.currentAlgorithm = this.quickSortAlgorithmService;
        break;
      case AlgorithmList.Heap:
        this.currentAlgorithm = this.heapSortAlgorithmService;
    }
  }

  constructor(private bubbleSortAlgorithmService: BubbleSortAlgorithmService,
              private mergeSortAlgorithmService: MergeSortAlgorithmService,
              private quickSortAlgorithmService: QuickSortAlgorithmService,
              private heapSortAlgorithmService: HeapSortAlgorithmService) { }

  getAlgorithmList(): Observable<string[]> {
    return of(Object.keys(AlgorithmList).map(k => AlgorithmList[k as string]));
  }

  sort(bars: Bar[]): void {
    //sort on a clone of the target array
    this.currentAlgorithm.sort([...bars], this.resultSource);
  }
}
