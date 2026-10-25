import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSideBarComponent } from './fixed-side-bar.component';

describe('FixedSideBarComponent', () => {
  let component: FixedSideBarComponent;
  let fixture: ComponentFixture<FixedSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
