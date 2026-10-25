import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFileSiteComponent } from './input-file-site.component';

describe('InputFileSiteComponent', () => {
  let component: InputFileSiteComponent;
  let fixture: ComponentFixture<InputFileSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileSiteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFileSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
