import { Injectable } from '@angular/core';
import {Bar} from "../bar";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  createBars(size: number): Observable<Bar[]> {
    let bars = [];

    for(let i = 1; i <= size; i++) {
      let bar: Bar = {
        highlighted: false,
        value: i * 2
      };

      bars.push(bar);
    }

    return of(bars);
  }

  randomizeArray(bars: Bar[]): Observable<Bar[]> {
    let size = bars.length;

    for(let i = 0; i < size; i++) {
      let a = Math.floor(Math.random() * size);
      let b = Math.floor(Math.random() * size);

      let temp = bars[a];
      bars[a] = bars[b];
      bars[b] = temp;
    }

    return of(bars);
  }

  sort(bars: Bar[]): Observable<Bar[]> {
    return of(bars);
  }
}
