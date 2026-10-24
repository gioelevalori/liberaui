import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchThemeSiteComponent } from './switch-theme-site.component';

describe('SwitchThemeSiteComponent', () => {
  let component: SwitchThemeSiteComponent;
  let fixture: ComponentFixture<SwitchThemeSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchThemeSiteComponent], providers: [provideNoopAnimations(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SwitchThemeSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
