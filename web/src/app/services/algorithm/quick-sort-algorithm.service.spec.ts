import { TestBed } from '@angular/core/testing';

import { QuickSortAlgorithmService } from './quick-sort-algorithm.service';

describe('QuickSortAlgorithmService', () => {
  let service: QuickSortAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickSortAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
