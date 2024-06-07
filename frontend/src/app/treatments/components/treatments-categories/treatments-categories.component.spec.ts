import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsCategoriesComponent } from './treatments-categories.component';

describe('TreatmentsCategoriesComponent', () => {
  let component: TreatmentsCategoriesComponent;
  let fixture: ComponentFixture<TreatmentsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentsCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
