import { TestBed } from '@angular/core/testing';

import { TimeContentService } from './time-content.service';

describe('TimeContentService', () => {
  let service: TimeContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
