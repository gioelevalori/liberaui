import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from '../projects/libera-ui/src/lib/components/switch/switch.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SwitchComponent],
  template: `<lib-switch label="Focus mode" [formControl]="control" />`,
})
class SwitchHost {
  control = new FormControl(false, { nonNullable: true });
}

describe('Switch forms integration', () => {
  it('synchronizes clicks, programmatic values, and disabled state with reactive forms', () => {
    const fixture = TestBed.createComponent(SwitchHost);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-checked')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBeTrue();
    expect(button.getAttribute('aria-checked')).toBe('true');
    fixture.componentInstance.control.setValue(false);
    fixture.detectChanges();
    expect(button.getAttribute('aria-checked')).toBe('false');
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();
    button.click();
    expect(fixture.componentInstance.control.value).toBeFalse();
  });
});
