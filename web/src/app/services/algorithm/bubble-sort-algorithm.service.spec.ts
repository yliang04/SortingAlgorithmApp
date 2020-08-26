import { TestBed } from '@angular/core/testing';

import { BubbleSortAlgorithmService } from './bubble-sort-algorithm.service';

describe('BubbleSortAlgorithmService', () => {
  let service: BubbleSortAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleSortAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
