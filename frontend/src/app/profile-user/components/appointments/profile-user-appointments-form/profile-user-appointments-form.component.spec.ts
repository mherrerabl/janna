import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserAppointmentsFormComponent } from './profile-user-appointments-form.component';

describe('ProfileUserAppointmentsFormComponent', () => {
  let component: ProfileUserAppointmentsFormComponent;
  let fixture: ComponentFixture<ProfileUserAppointmentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserAppointmentsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserAppointmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
