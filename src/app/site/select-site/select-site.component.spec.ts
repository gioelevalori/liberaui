import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSiteComponent } from './select-site.component';

describe('SelectSiteComponent', () => {
  let component: SelectSiteComponent;
  let fixture: ComponentFixture<SelectSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSiteComponent], providers: [provideNoopAnimations(), provideRouter([])]
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
