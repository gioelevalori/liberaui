import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSiteComponent } from './select-site.component';

describe('SelectSiteComponent', () => {
  let component: SelectSiteComponent;
  let fixture: ComponentFixture<SelectSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
