import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMealsComponent } from './update-meals.component';

describe('UpdateMealsComponent', () => {
  let component: UpdateMealsComponent;
  let fixture: ComponentFixture<UpdateMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
