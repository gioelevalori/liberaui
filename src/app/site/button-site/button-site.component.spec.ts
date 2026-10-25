import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSiteComponent } from './button-site.component';

describe('ButtonComponent', () => {
  let component: ButtonSiteComponent;
  let fixture: ComponentFixture<ButtonSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSiteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
