import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyBookingsComponent } from './view-my-bookings.component';

describe('ViewMyBookingsComponent', () => {
  let component: ViewMyBookingsComponent;
  let fixture: ComponentFixture<ViewMyBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMyBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
