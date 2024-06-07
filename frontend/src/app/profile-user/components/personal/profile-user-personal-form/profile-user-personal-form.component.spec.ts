import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserPersonalFormComponent } from './profile-user-personal-form.component';

describe('ProfileUserPersonalFormComponent', () => {
  let component: ProfileUserPersonalFormComponent;
  let fixture: ComponentFixture<ProfileUserPersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserPersonalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserPersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
