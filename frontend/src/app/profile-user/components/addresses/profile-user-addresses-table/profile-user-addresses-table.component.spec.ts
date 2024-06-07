import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserAddressesTableComponent } from './profile-user-addresses-table.component';

describe('ProfileUserAddressesTableComponent', () => {
  let component: ProfileUserAddressesTableComponent;
  let fixture: ComponentFixture<ProfileUserAddressesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserAddressesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserAddressesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
