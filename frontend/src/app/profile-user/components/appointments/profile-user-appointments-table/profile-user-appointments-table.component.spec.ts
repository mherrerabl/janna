import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserAppointmentsTableComponent } from './profile-user-appointments-table.component';

describe('ProfileUserAppointmentsTableComponent', () => {
  let component: ProfileUserAppointmentsTableComponent;
  let fixture: ComponentFixture<ProfileUserAppointmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserAppointmentsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserAppointmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
