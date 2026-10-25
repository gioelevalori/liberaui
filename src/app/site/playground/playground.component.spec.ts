import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { PlaygroundComponent } from './playground.component';

describe('PlaygroundComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
  });
  it('keeps the rendered button and copyable example in sync', () => {
    const fixture = TestBed.createComponent(PlaygroundComponent);
    fixture.detectChanges();
    fixture.componentInstance.label = 'Ship it';
    fixture.componentInstance.radius = 24;
    fixture.componentInstance.accent = '#2454ce';
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector<HTMLButtonElement>('.preview-stage button')!;
    expect(button.textContent?.trim()).toBe('Ship it');
    expect(button.style.borderRadius).toBe('24px');
    expect(button.disabled).toBeTrue();
    const examples = element.querySelectorAll('lib-code code');
    const code = examples[examples.length - 1].textContent!;
    expect(code).toContain('[radius]="24"');
    expect(code).toContain('color="#2454ce"');
    expect(code).toContain('[disabled]="true"');
    expect(code).toContain('Ship it');
  });
  it('escapes template syntax in labels and resets all controls', () => {
    const component = TestBed.createComponent(PlaygroundComponent).componentInstance;
    component.label = '<b>{{ value }}</b>';
    expect(component.code).toContain('&lt;b&gt;&#123;&#123; value &#125;&#125;&lt;/b&gt;');
    component.disabled = true;
    component.clicks = 3;
    component.radius = 0;
    component.reset();
    expect(component.disabled).toBeFalse();
    expect(component.clicks).toBe(0);
    expect(component.radius).toBe(12);
    expect(component.label).toBe('Create something');
  });
});
