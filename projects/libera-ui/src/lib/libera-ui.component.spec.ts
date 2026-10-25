import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberaUiComponent } from './libera-ui.component';

describe('LiberaUiComponent', () => {
  let component: LiberaUiComponent;
  let fixture: ComponentFixture<LiberaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiberaUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiberaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
