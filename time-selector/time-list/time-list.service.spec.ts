import { TestBed } from '@angular/core/testing';

import { TimeListService } from './time-list.service';

describe('TimeListService', () => {
  let service: TimeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
