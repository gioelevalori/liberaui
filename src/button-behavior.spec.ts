import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../projects/libera-ui/src/lib/components/button/button.component';

describe('Button states', () => {
  it('disables native activation while loading and retains the selected variant', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentInstance.variant = 'outline';
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('data-variant')).toBe('outline');
    expect(button.type).toBe('button');
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
    expect(button.getAttribute('aria-busy')).toBe('false');
  });
});
