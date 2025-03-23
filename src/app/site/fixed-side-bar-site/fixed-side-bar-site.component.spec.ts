import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSideBarSiteComponent } from './fixed-side-bar-site.component';

describe('FixedSideBarSiteComponent', () => {
  let component: FixedSideBarSiteComponent;
  let fixture: ComponentFixture<FixedSideBarSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedSideBarSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FixedSideBarSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
