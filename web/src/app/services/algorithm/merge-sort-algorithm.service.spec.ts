import { TestBed } from '@angular/core/testing';

import { MergeSortAlgorithmService } from './merge-sort-algorithm.service';

describe('MergeSortAlgorithmService', () => {
  let service: MergeSortAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MergeSortAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
