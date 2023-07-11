import { TestBed } from '@angular/core/testing';

import { EquivalenciaService } from './equivalencia.service';

describe('EquivalenciaService', () => {
  let service: EquivalenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquivalenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
