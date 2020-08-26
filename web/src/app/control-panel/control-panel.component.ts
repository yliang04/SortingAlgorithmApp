import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";
import {AlgorithmService} from "../services/algorithm.service";
import {AlgorithmList} from "../services/algorithm/algorithm-list";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  @Input() size: number = 20;
  @Input() selectedAlgorithm: string = AlgorithmList.Bubble;

  randomizeEventSubject: Subject<void>  = new Subject<void>();
  sortEventSubject: Subject<void>  = new Subject<void>();
  swapEvenSubject: Subject<void> = new Subject<void>();

  algorithmList: string[];

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.getAlgorithms();
  }

  randomize(): void {
    this.randomizeEventSubject.next();
  }

  sort(): void {
    this.sortEventSubject.next();
  }

  swap(): void {
    this.swapEvenSubject.next();
  }

  getAlgorithms(): void {
    this.algorithmService.getAlgorithmList().subscribe(list => this.algorithmList = list);
  }
}
