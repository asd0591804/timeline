import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeContentComponent } from './time-content.component';

describe('TimeContentService', () => {
  let component: TimeContentComponent;
  let fixture: ComponentFixture<TimeContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeContentComponent]
    });
    fixture = TestBed.createComponent(TimeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
