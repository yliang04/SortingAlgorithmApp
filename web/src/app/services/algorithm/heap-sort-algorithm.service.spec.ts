import { TestBed } from '@angular/core/testing';

import { HeapSortAlgorithmService } from './heap-sort-algorithm.service';

describe('HeapSortAlgorithmService', () => {
  let service: HeapSortAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeapSortAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
