import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeMenuComponent } from './time-menu.component';

describe('TimeMenuComponent', () => {
  let component: TimeMenuComponent;
  let fixture: ComponentFixture<TimeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeMenuComponent]
    });
    fixture = TestBed.createComponent(TimeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
