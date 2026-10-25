import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberSiteComponent } from './input-number-site.component';

describe('InputNumberSiteComponent', () => {
  let component: InputNumberSiteComponent;
  let fixture: ComponentFixture<InputNumberSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberSiteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InputNumberSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
