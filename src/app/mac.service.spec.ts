import { TestBed, inject } from '@angular/core/testing';

import { MacService } from './mac.service';

describe('MacService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MacService]
    });
  });

  it('should be created', inject([MacService], (service: MacService) => {
    expect(service).toBeTruthy();
  }));
});
