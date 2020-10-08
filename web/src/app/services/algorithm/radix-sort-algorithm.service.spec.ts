import { TestBed } from '@angular/core/testing';

import { RadixSortAlgorithmService } from './radix-sort-algorithm.service';

describe('RadixSortAlgorithmService', () => {
  let service: RadixSortAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadixSortAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
