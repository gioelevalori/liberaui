import { TestBed } from '@angular/core/testing';

import { LiberaUiService } from './libera-ui.service';

describe('LiberaUiService', () => {
  let service: LiberaUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiberaUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
