import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserOrdersTableComponent } from './profile-user-orders-table.component';

describe('ProfileUserOrdersTableComponent', () => {
  let component: ProfileUserOrdersTableComponent;
  let fixture: ComponentFixture<ProfileUserOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileUserOrdersTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileUserOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
