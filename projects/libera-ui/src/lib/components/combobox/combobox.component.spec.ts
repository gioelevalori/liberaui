import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComboboxComponent, ComboboxOption } from './combobox.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ComboboxComponent],
  template: `<lib-combobox label="Country" [options]="options" [formControl]="country" />`,
})
class HostComponent {
  country = new FormControl<string | null>(null);
  options: ComboboxOption[] = [
    { value: 'it', label: 'Italy' },
    { value: 'ie', label: 'Ireland' },
    { value: 'jp', label: 'Japan' },
  ];
}

describe('ComboboxComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const input = () => fixture.nativeElement.querySelector('input') as HTMLInputElement;
  const listbox = () => fixture.nativeElement.querySelector('[role="listbox"]') as HTMLElement;
  const options = () =>
    Array.from(fixture.nativeElement.querySelectorAll('[role="option"]')) as HTMLElement[];
  const key = async (value: string, init: KeyboardEventInit = {}) => {
    input().dispatchEvent(new KeyboardEvent('keydown', { key: value, cancelable: true, ...init }));
    await fixture.whenStable();
  };
  const type = async (text: string) => {
    input().value = text;
    input().dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  it('exposes a collapsed combobox connected to its listbox', () => {
    expect(input().getAttribute('role')).toBe('combobox');
    expect(input().getAttribute('aria-autocomplete')).toBe('list');
    expect(input().getAttribute('aria-expanded')).toBe('false');
    expect(input().getAttribute('aria-controls')).toBe(listbox().id);
    expect(input().getAttribute('aria-label')).toBe('Country');
    expect(listbox().hidden).toBeTrue();
  });

  it('filters while typing and highlights the first match', async () => {
    await type('i');
    expect(input().getAttribute('aria-expanded')).toBe('true');
    expect(options().map((o) => o.textContent?.trim())).toEqual(['Italy', 'Ireland']);
    expect(input().getAttribute('aria-activedescendant')).toBe(options()[0].id);
  });

  it('moves the active option with arrows and selects with Enter', async () => {
    await key('ArrowDown');
    expect(options().length).toBe(3);
    expect(input().getAttribute('aria-activedescendant')).toBe(options()[0].id);
    await key('ArrowDown');
    await key('ArrowDown');
    await key('ArrowDown');
    expect(input().getAttribute('aria-activedescendant')).toBe(options()[0].id);
    await key('ArrowUp');
    expect(options()[2].getAttribute('aria-selected')).toBe('false');
    await key('Enter');
    expect(fixture.componentInstance.country.value).toBe('jp');
    expect(input().value).toBe('Japan');
    expect(listbox().hidden).toBeTrue();
  });

  it('selects with a pointer without moving focus away', async () => {
    await type('ja');
    const option = options()[0];
    const down = new MouseEvent('mousedown', { cancelable: true });
    option.dispatchEvent(down);
    expect(down.defaultPrevented).toBeTrue();
    option.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.country.value).toBe('jp');
  });

  it('closes on Escape and restores the selected label on blur', async () => {
    fixture.componentInstance.country.setValue('it');
    await fixture.whenStable();
    expect(input().value).toBe('Italy');
    await type('xyz');
    expect(fixture.nativeElement.querySelector('.lib-combobox-empty').textContent).toContain(
      'No results',
    );
    await key('Escape');
    expect(listbox().hidden).toBeTrue();
    input().dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(input().value).toBe('Italy');
    expect(fixture.componentInstance.country.value).toBe('it');
  });

  it('shows every option when reopened on a selected value', async () => {
    fixture.componentInstance.country.setValue('ie');
    await fixture.whenStable();
    await key('ArrowDown', { altKey: true });
    expect(options().length).toBe(3);
    expect(options()[1].getAttribute('aria-selected')).toBe('true');
  });
});
