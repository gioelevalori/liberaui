import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });
  afterEach(() => {
    localStorage.removeItem('liberaui-material');
    document.body.classList.remove('lib-glass', 'lib-glass-backdrop');
  });
  it('defaults to Glass for new visitors and respects an explicit saved Essential choice', () => {
    localStorage.removeItem('liberaui-material');
    const first = TestBed.createComponent(AppComponent);
    expect(first.componentInstance.glass).toBeTrue();
    expect(document.body.classList.contains('lib-glass')).toBeTrue();
    first.componentInstance.toggleMaterial();
    expect(localStorage.getItem('liberaui-material')).toBe('solid');
    const returning = TestBed.createComponent(AppComponent);
    expect(returning.componentInstance.glass).toBeFalse();
  });
  it('renders the LiberaUI brand and mobile navigation control', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.brand')?.textContent).toBe('LiberaUI');
    const toggle = element.querySelector<HTMLButtonElement>('.menu-toggle')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('.docs-nav')?.classList.contains('is-open')).toBeTrue();
  });
});
