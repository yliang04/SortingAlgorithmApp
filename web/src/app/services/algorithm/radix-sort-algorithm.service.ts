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
    //first convert object array to num array
    let numArray = this.convertToNumArray(bars);

    //first find the max number in the given array
    let max = this.findMaxNum(numArray);

    //base 10 radix sort
    let base = 10;

    //for each digit that the max value has, sort the array once at the given digit position
    //max / i >= 1 because i is like double(java). It doesn't get rounded to integer like in Java
    for(let i = 1; max / i >= 1; i *= 10) {
      numArray = this.countingSort(numArray, i, result, base);
    }
  }

  /**
   * Find the max number/bar
   * @param array
   */
  private findMaxNum(array: number[]): number {
    let max = 0;
    for(let num of array) {
      if(num > max) {
        max = num;
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
      count[Math.floor(array[i] / digit) % base]++;

    }

    //sort the numbers
    for(let i = 1; i < base; i++) {
      count[i] += count[i - 1];
    }

    //create output array based on count
    for(let i = array.length - 1; i >= 0; i--) {
      let countIndex = Math.floor(array[i] / digit) % base;

      output[count[countIndex] - 1] = array[i];

      //add result before decrement the count
      this.addToResult(result, count[countIndex] - 1, array[i]);

      count[countIndex]--;
    }

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
