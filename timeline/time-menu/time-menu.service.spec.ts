import { TestBed } from '@angular/core/testing';

import { TimeMenuService } from './time-menu.service';

describe('TimeMenuService', () => {
  let service: TimeMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
