import { TestBed } from '@angular/core/testing';

import { VuelosService } from './vuelos.service';

describe('VuelosService', () => {
  let service: VuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
