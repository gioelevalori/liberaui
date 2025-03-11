import { TestBed } from '@angular/core/testing';

import { NgLibraryUiService } from './ng-library-ui.service';

describe('NgLibraryUiService', () => {
  let service: NgLibraryUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgLibraryUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
