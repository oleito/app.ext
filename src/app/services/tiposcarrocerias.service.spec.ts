import { TestBed } from '@angular/core/testing';

import { TiposcarroceriasService } from './tiposcarrocerias.service';

describe('TiposcarroceriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposcarroceriasService = TestBed.get(TiposcarroceriasService);
    expect(service).toBeTruthy();
  });
});
