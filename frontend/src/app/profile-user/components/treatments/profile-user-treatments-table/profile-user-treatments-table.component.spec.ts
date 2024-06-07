import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserTreatmentsTableComponent } from './profile-user-treatments-table.component';

describe('ProfileUserTreatmentsTableComponent', () => {
  let component: ProfileUserTreatmentsTableComponent;
  let fixture: ComponentFixture<ProfileUserTreatmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserTreatmentsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserTreatmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
