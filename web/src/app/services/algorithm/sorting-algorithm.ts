import {Bar} from "../../graph/bar";
import {Subject} from "rxjs";
import {Step} from "../../step";

export declare interface SortingAlgorithm {
  sort(bars: Bar[], resultEmitter: Subject<Step[]>): void;
}
