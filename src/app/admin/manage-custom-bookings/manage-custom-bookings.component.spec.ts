import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomBookingsComponent } from './manage-custom-bookings.component';

describe('ManageCustomBookingsComponent', () => {
  let component: ManageCustomBookingsComponent;
  let fixture: ComponentFixture<ManageCustomBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCustomBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCustomBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
