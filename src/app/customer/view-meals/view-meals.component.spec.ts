import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMealsComponent } from './view-meals.component';

describe('ViewMealsComponent', () => {
  let component: ViewMealsComponent;
  let fixture: ComponentFixture<ViewMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
