import { TestBed } from '@angular/core/testing';

import { UserTreatmentsService } from './user-treatments.service';

describe('UserTreatmentsService', () => {
  let service: UserTreatmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTreatmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
