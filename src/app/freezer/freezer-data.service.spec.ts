import { TestBed, inject } from '@angular/core/testing';

import { FreezerDataService } from './freezer-data.service';

describe('FreezerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreezerDataService]
    });
  });

  it('should be created', inject([FreezerDataService], (service: FreezerDataService) => {
    expect(service).toBeTruthy();
  }));
});
