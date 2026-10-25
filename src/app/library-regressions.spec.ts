import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '../../projects/libera-ui/src/lib/components/input-text/input-text.component';
import { InputNumberComponent } from '../../projects/libera-ui/src/lib/components/input-number/input-number.component';
import { InputPasswordComponent } from '../../projects/libera-ui/src/lib/components/input-password/input-password.component';
import { InputTextareaComponent } from '../../projects/libera-ui/src/lib/components/input-textarea/input-textarea.component';
import { InputDateComponent } from '../../projects/libera-ui/src/lib/components/input-date/input-date.component';
import { InputCheckboxComponent } from '../../projects/libera-ui/src/lib/components/input-checkbox/input-checkbox.component';
import { SelectComponent } from '../../projects/libera-ui/src/lib/components/select/select.component';
import { TabComponent } from '../../projects/libera-ui/src/lib/components/tab/tab.component';
import { AccordionComponent } from '../../projects/libera-ui/src/lib/components/accordion/accordion.component';
import { AlertComponent } from '../../projects/libera-ui/src/lib/components/alert/alert.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputTextareaComponent,
    InputDateComponent,
    InputCheckboxComponent,
    SelectComponent,
  ],
  template: `<lib-input-text [formControl]="text" /><lib-input-number
      [formControl]="number"
    /><lib-input-password [formControl]="password" /><lib-input-textarea
      [formControl]="notes"
    /><lib-input-date [formControl]="date" /><lib-input-checkbox
      [formControl]="checked"
    /><lib-select [formControl]="choice" [options]="options" />`,
})
class FormHost {
  text = new FormControl('Initial');
  number = new FormControl<number | null>(42);
  password = new FormControl('secret');
  notes = new FormControl('Notes');
  date = new FormControl('2026-10-25');
  checked = new FormControl(false);
  choice = new FormControl<string | number>(42);
  options = [
    { value: 7, label: 'Number seven' },
    { value: '7', label: 'String seven' },
    { value: 42, label: 'Forty two' },
  ];
}
describe('Angular forms regressions', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [FormHost] }));
  it('renders values supplied by reactive forms and preserves numeric select values', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector<HTMLInputElement>('lib-input-text input')!.value).toBe('Initial');
    expect(el.querySelector<HTMLInputElement>('lib-input-number input')!.value).toBe('42');
    expect(el.querySelector<HTMLInputElement>('lib-input-date input')!.value).toBe('2026-10-25');
    expect(el.querySelector<HTMLTextAreaElement>('textarea')!.value).toBe('Notes');
    const select = el.querySelector('select')!;
    expect(select.selectedIndex).toBe(3);
    select.value = '2';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.choice.value).toBe(42);
    select.value = '1';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.choice.value).toBe('7');
  });
  it('propagates edits and blur, and handles numeric reset without a zero maximum', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector<HTMLInputElement>('lib-input-text input')!;
    input.value = 'Edited';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    expect(host.text.value).toBe('Edited');
    expect(host.text.touched).toBeTrue();
    const number = el.querySelector<HTMLInputElement>('lib-input-number input')!;
    expect(number.hasAttribute('max')).toBeFalse();
    expect(number.hasAttribute('min')).toBeFalse();
    number.value = '';
    number.dispatchEvent(new Event('input'));
    expect(host.number.value).toBeNull();
    host.text.setValue('Programmatic');
    fixture.detectChanges();
    expect(input.value).toBe('Programmatic');
    host.text.disable();
    fixture.detectChanges();
    expect(input.disabled).toBeTrue();
  });
  it('supports checkbox forms and password reveal without changing the password', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const check = el.querySelector<HTMLInputElement>('lib-input-checkbox input')!;
    check.click();
    expect(fixture.componentInstance.checked.value).toBeTrue();
    const password = el.querySelector<HTMLInputElement>('lib-input-password input')!;
    expect(password.type).toBe('password');
    el.querySelector<HTMLButtonElement>('lib-input-password button')!.click();
    fixture.detectChanges();
    expect(password.type).toBe('text');
    expect(password.value).toBe('secret');
    expect(fixture.componentInstance.password.value).toBe('secret');
  });
  it('honors selectedValue outside Angular forms', () => {
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentRef.setInput('options', [{ value: 42, label: 'Forty two' }]);
    fixture.componentRef.setInput('selectedValue', 42);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('select').value).toBe('0');
  });
});
describe('New interface patterns', () => {
  it('navigates tabs with arrows, skips disabled tabs and connects unique panels', () => {
    const fixture = TestBed.createComponent(TabComponent);
    fixture.componentRef.setInput('items', [
      { id: 'a', label: 'First', content: 'First content' },
      { id: 'b', label: 'Disabled', disabled: true },
      { id: 'c', label: 'Last', content: 'Last content' },
    ]);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll(
      '[role=tab]',
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.activeId).toBe('c');
    expect(document.activeElement).toBe(buttons[2]);
    expect(
      fixture.nativeElement.querySelector('#' + buttons[2].getAttribute('aria-controls')).hidden,
    ).toBeFalse();
    buttons[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.activeId).toBe('a');
    const other = TestBed.createComponent(TabComponent);
    expect(other.componentInstance.uid).not.toBe(fixture.componentInstance.uid);
  });
  it('keeps accordion single/multiple mode controlled and ignores disabled items', () => {
    const fixture = TestBed.createComponent(AccordionComponent);
    fixture.componentRef.setInput('items', [
      { id: 'a', title: 'First', content: 'First' },
      { id: 'b', title: 'Second', content: 'Second' },
      { id: 'c', title: 'Disabled', content: '', disabled: true },
    ]);
    fixture.detectChanges();
    const summaries = fixture.nativeElement.querySelectorAll('summary') as NodeListOf<HTMLElement>;
    summaries[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.openIds).toEqual(['a']);
    summaries[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.openIds).toEqual(['b']);
    fixture.componentRef.setInput('multiple', true);
    fixture.detectChanges();
    summaries[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.openIds).toEqual(['b', 'a']);
    summaries[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.openIds).toEqual(['b', 'a']);
  });
  it('announces errors, dismisses and reopens alerts', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput('tone', 'danger');
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]')).toBeTruthy();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]')).toBeNull();
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]')).toBeTruthy();
  });
});

describe('Themed date picker', () => {
  it('keeps calendar selection in sync with a reactive form', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    el.querySelector<HTMLButtonElement>('.lib-date-trigger')!.click();
    fixture.detectChanges();
    expect(el.querySelector('.lib-date-picker')!.matches(':popover-open')).toBeTrue();
    el.querySelector<HTMLButtonElement>('[data-date="2026-10-26"]')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.date.value).toBe('2026-10-26');
    expect(fixture.componentInstance.date.touched).toBeTrue();
    expect(el.querySelector('.lib-date-picker')!.matches(':popover-open')).toBeFalse();
    fixture.destroy();
  });
  it('handles leap years, month boundaries and date limits', () => {
    const fixture = TestBed.createComponent(InputDateComponent);
    fixture.componentRef.setInput('value', '2024-02-28');
    fixture.componentRef.setInput('min', '2024-02-10');
    fixture.componentRef.setInput('max', '2024-03-02');
    fixture.detectChanges();
    const c = fixture.componentInstance;
    c.toggle();
    fixture.detectChanges();
    expect(c.days.filter(Boolean).length).toBe(29);
    expect(c.unavailable(new Date(2024, 1, 9))).toBeTrue();
    c.navigate(
      new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }),
      new Date(2024, 1, 29),
    );
    fixture.detectChanges();
    expect(c.focusDate).toBe('2024-03-01');
    c.choose(new Date(2024, 2, 3));
    expect(c.value).toBe('2024-02-28');
    c.choose(new Date(2024, 2, 2));
    expect(c.value).toBe('2024-03-02');
    fixture.destroy();
  });
});

describe('Library style isolation', () => {
  it('leaves unrelated application inputs alone', () => {
    const plain = document.createElement('input');
    plain.className = 'custom-input';
    document.body.appendChild(plain);
    const fixture = TestBed.createComponent(FormHost);
    try {
      fixture.detectChanges();
      const libraryInput = fixture.nativeElement.querySelector('lib-input-text input');
      expect(getComputedStyle(libraryInput).minHeight).toBe('40px');
      expect(getComputedStyle(plain).minHeight).not.toBe('40px');
      expect(getComputedStyle(plain).marginTop).not.toBe('8px');
    } finally {
      plain.remove();
      fixture.destroy();
    }
  });

  it('allows application form styles to override shared field defaults', () => {
    const style = document.createElement('style');
    style.textContent = '.consumer-form .custom-input { border-radius: 19px; }';
    document.head.appendChild(style);
    const fixture = TestBed.createComponent(FormHost);
    try {
      fixture.nativeElement.classList.add('consumer-form');
      fixture.detectChanges();
      const fields = fixture.nativeElement.querySelectorAll(
        'lib-input-text input, lib-select select, lib-input-password input',
      );
      fields.forEach((field: Element) => {
        expect(getComputedStyle(field).borderRadius).toBe('19px');
      });
    } finally {
      style.remove();
      fixture.destroy();
    }
  });
});
