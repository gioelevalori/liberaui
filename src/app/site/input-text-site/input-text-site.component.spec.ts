import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextSiteComponent } from './input-text-site.component';

describe('InputTextSiteComponent', () => {
  let component: InputTextSiteComponent;
  let fixture: ComponentFixture<InputTextSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextSiteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
