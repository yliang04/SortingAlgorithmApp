import {Bar} from "../../graph/bar";
import {Subject} from "rxjs";
import {Pair} from "../../pair";

export declare interface SortingAlgorithm {
  sort(bars: Bar[], resultEmitter: Subject<Pair[]>): void;
}
