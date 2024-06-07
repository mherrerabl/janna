import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalWarningComponent } from './legal-warning.component';

describe('LegalWarningComponent', () => {
  let component: LegalWarningComponent;
  let fixture: ComponentFixture<LegalWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalWarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
