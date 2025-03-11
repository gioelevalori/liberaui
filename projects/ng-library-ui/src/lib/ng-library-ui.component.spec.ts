import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLibraryUiComponent } from './ng-library-ui.component';

describe('NgLibraryUiComponent', () => {
  let component: NgLibraryUiComponent;
  let fixture: ComponentFixture<NgLibraryUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgLibraryUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgLibraryUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
