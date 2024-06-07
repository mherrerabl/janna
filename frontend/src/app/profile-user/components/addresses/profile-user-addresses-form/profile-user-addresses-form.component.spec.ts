import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserAddressesFormComponent } from './profile-user-addresses-form.component';

describe('ProfileUserAddressesFormComponent', () => {
  let component: ProfileUserAddressesFormComponent;
  let fixture: ComponentFixture<ProfileUserAddressesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserAddressesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserAddressesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
