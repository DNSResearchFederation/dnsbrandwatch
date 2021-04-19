import { TestBed } from '@angular/core/testing';

import { LawEnforcementService } from './law-enforcement.service';

describe('LawEnforcementService', () => {
  let service: LawEnforcementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawEnforcementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
