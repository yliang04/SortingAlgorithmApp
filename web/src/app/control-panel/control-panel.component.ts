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

  @Input() size: number = 150;
  @Input() selectedAlgorithm: string = AlgorithmList.Quick;

  private randomizeEventSubject: Subject<void>  = new Subject<void>();
  private sortEventSubject: Subject<void>  = new Subject<void>();
  private swapEvenSubject: Subject<void> = new Subject<void>();

  randomizeSignal = this.randomizeEventSubject.asObservable();
  sortSignal = this.sortEventSubject.asObservable();
  swapSignal = this.swapEvenSubject.asObservable();

  algorithmList: string[];
  formDisabled: boolean = false;

  constructor(private algorithmService: AlgorithmService) {}

  ngOnInit(): void {
    this.getAlgorithms();
  }

  randomize(): void {
    this.randomizeEventSubject.next();
  }

  sort(): void {
    this.sortEventSubject.next();
    this.formDisabled = true;
  }

  swap(): void {
    this.swapEvenSubject.next();
  }

  getAlgorithms(): void {
    this.algorithmService.getAlgorithmList().subscribe(list => this.algorithmList = list);
  }
}
