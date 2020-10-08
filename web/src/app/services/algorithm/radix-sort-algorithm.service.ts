import { Injectable } from '@angular/core';
import { SortingAlgorithm } from "./sorting-algorithm";
import { Bar } from "../../graph/bar";
import { Subject } from "rxjs";
import { Step } from "../../step";

@Injectable({
  providedIn: 'root'
})
export class RadixSortAlgorithmService implements SortingAlgorithm{

  constructor() { }

  sort(bars: Bar[], resultEmitter: Subject<Step[]>): void {
    let result : Step[] = [];

    this.radixSort(bars, result);

    resultEmitter.next(result);
  }

  private radixSort(bars: Bar[], result: Step[]): void {
    //first find the max number in the given array
    let max = this.findMaxNum(bars);

    //base 10 radix sort
    let base = 10;

    let numArray = this.convertToNumArray(bars);


    //for each digit that the max value has, sort the array once at the given digit position
    for(let i = 1; max / i > 0; i *= 10) {
      numArray = this.countingSort(numArray, i, result, base);
    }
  }

  /**
   * Find the max number/bar
   * @param bars
   */
  private findMaxNum(bars: Bar[]): number {
    let max = 0;
    for(let bar of bars) {
      if(bar.value > max) {
        max = bar.value;
      }
    }

    return max;
  }

  /**
   * Counting sort
   * @param array array
   * @param digit digit comes in the form 1, 10, 100, 1000.....
   * @param result steps array
   * @param base base 10 operation
   */
  private countingSort(array: number[], digit: number, result: Step[], base: number): number[] {
    let count = this.createArray(base);
    let output = this.createArray(array.length);

    //Count the frequency of each number appear at this digit through out the entire array
    for(let i = 0; i < array.length; i++) {
      count[(array[i] / digit) % base]++;
    }

    //sort the numbers
    for(let i = 1; i < base; i++) {
      count[i] += count[i - 1];
    }

    //create output array based on count
    for(let i = array.length - 1; i >= 0; i--) {
      let countIndex = (array[i] / digit) % base;

      output[count[countIndex] - 1] = array[i];
      count[countIndex]--;

      //this.addToResult(result, count[countIndex] - 1, array[i])
    }

    console.log("output length: " + output.length);

    return output;
  }

  /**
   * Create an array filled with 0s
   */
  private createArray(length: number): number[] {
    let count: number[] = [];

    for(let i = 0; i < length; i++) {
      count.push(0);
    }

    return count;
  }

  private convertToNumArray(bars: Bar[]): number[] {
    let result: number[] = [];

    for(let i = bars.length - 1; i >= 0; i--) {
      result.push(bars[i].value);
    }

    return result;
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
