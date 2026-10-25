import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDateSiteComponent } from './input-date-site.component';

describe('InputDateSiteComponent', () => {
  let component: InputDateSiteComponent;
  let fixture: ComponentFixture<InputDateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateSiteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
