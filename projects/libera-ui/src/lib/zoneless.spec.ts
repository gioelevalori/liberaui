import { Component, provideExperimentalZonelessChangeDetection, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeComponent } from './components/code/code.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { SelectComponent } from './components/select/select.component';
import { SwitchComponent } from './components/switch/switch.component';

/** Renders a control bound to a reactive FormControl without zone.js. */
async function renderBound<T>(control: Type<unknown>, selector: string, initial: T) {
  const extra = selector === 'lib-select' ? '[options]="options"' : '';
  @Component({
    standalone: true,
    imports: [ReactiveFormsModule, control],
    template: `<${selector} [formControl]="control" ${extra} />`,
  })
  class HostComponent {
    control = new FormControl<T>(initial);
    options = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ];
  }
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [provideExperimentalZonelessChangeDetection()],
  });
  const fixture = TestBed.createComponent(HostComponent);
  await fixture.whenStable();
  return fixture;
}

describe('Form controls without zone.js', () => {
  const textControls: [string, Type<unknown>, string, string, string][] = [
    ['lib-input-text', InputTextComponent, 'input', '', 'updated'],
    ['lib-input-password', InputPasswordComponent, 'input', '', 'secret'],
    ['lib-input-textarea', InputTextareaComponent, 'textarea', '', 'notes'],
    ['lib-input-date', InputDateComponent, 'input', '', '2026-11-02'],
  ];

  for (const [selector, type, element, initial, next] of textControls) {
    it(`${selector} renders programmatic value and disabled changes`, async () => {
      const fixture = await renderBound<string>(type, selector, initial);
      const field: HTMLInputElement = fixture.nativeElement.querySelector(element);

      fixture.componentInstance.control.setValue(next);
      await fixture.whenStable();
      expect(field.value).toBe(next);

      fixture.componentInstance.control.disable();
      await fixture.whenStable();
      expect(field.disabled).toBeTrue();
    });
  }

  it('lib-input-number renders programmatic values', async () => {
    const fixture = await renderBound<number | null>(
      InputNumberComponent,
      'lib-input-number',
      null,
    );
    const field: HTMLInputElement = fixture.nativeElement.querySelector('input');
    fixture.componentInstance.control.setValue(42);
    await fixture.whenStable();
    expect(field.value).toBe('42');
  });

  it('lib-select renders programmatic values', async () => {
    const fixture = await renderBound<string | null>(SelectComponent, 'lib-select', null);
    const field: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    fixture.componentInstance.control.setValue('b');
    await fixture.whenStable();
    expect(field.selectedOptions[0].textContent?.trim()).toBe('B');
  });

  it('lib-input-checkbox renders programmatic values', async () => {
    const fixture = await renderBound<boolean>(InputCheckboxComponent, 'lib-input-checkbox', false);
    const field: HTMLInputElement = fixture.nativeElement.querySelector('input');
    fixture.componentInstance.control.setValue(true);
    await fixture.whenStable();
    expect(field.checked).toBeTrue();
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(field.disabled).toBeTrue();
  });

  it('lib-switch renders programmatic values', async () => {
    const fixture = await renderBound<boolean>(SwitchComponent, 'lib-switch', false);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    fixture.componentInstance.control.setValue(true);
    await fixture.whenStable();
    expect(button.getAttribute('aria-checked')).toBe('true');
    fixture.componentInstance.control.disable();
    await fixture.whenStable();
    expect(button.disabled).toBeTrue();
  });
});

describe('CodeComponent without zone.js', () => {
  it('announces the copy result after the clipboard resolves', async () => {
    spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    TestBed.configureTestingModule({
      imports: [CodeComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(CodeComponent);
    fixture.componentRef.setInput('code', 'const a = 1;');
    await fixture.whenStable();

    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve));
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toBe('Copied!');
  });
});
