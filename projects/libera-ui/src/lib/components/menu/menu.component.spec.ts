import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent, MenuItem } from './menu.component';

@Component({
  standalone: true,
  imports: [MenuComponent],
  template: `<lib-menu label="Actions" [items]="items" (itemSelected)="selected = $event.id" />`,
})
class HostComponent {
  selected = '';
  items: MenuItem[] = [
    { id: 'edit', label: 'Edit' },
    { id: 'share', label: 'Share', disabled: true },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'delete', label: 'Delete', danger: true },
  ];
}

describe('MenuComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const trigger = () =>
    fixture.nativeElement.querySelector('.lib-menu-trigger') as HTMLButtonElement;
  const menu = () => fixture.nativeElement.querySelector('[role="menu"]') as HTMLElement;
  const items = () =>
    Array.from(fixture.nativeElement.querySelectorAll('[role="menuitem"]')) as HTMLButtonElement[];
  const key = (target: HTMLElement, value: string) =>
    target.dispatchEvent(
      new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true }),
    );
  const isOpen = () => menu().matches(':popover-open');
  /** The browser fires popover toggle events in a later task. */
  async function openByClick() {
    trigger().click();
    await new Promise((resolve) => setTimeout(resolve));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  });

  afterEach(() => fixture.nativeElement.remove());

  it('exposes a menu button connected to its menu', () => {
    expect(trigger().getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger().getAttribute('aria-controls')).toBe(menu().id);
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(menu().getAttribute('aria-labelledby')).toBe(trigger().id);
    expect(items()[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('opens on click and focuses the first item', async () => {
    await openByClick();
    expect(isOpen()).toBeTrue();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(items()[0]);
  });

  it('opens with ArrowUp on the last item and ArrowDown on the first', () => {
    trigger().focus();
    key(trigger(), 'ArrowUp');
    expect(document.activeElement).toBe(items()[3]);
    key(items()[3], 'Escape');
    key(trigger(), 'ArrowDown');
    expect(document.activeElement).toBe(items()[0]);
  });

  it('moves with arrows, wraps, skips disabled items and supports Home/End', async () => {
    await openByClick();
    key(items()[0], 'ArrowDown');
    expect(document.activeElement).toBe(items()[2]);
    key(items()[2], 'ArrowDown');
    key(items()[3], 'ArrowDown');
    expect(document.activeElement).toBe(items()[0]);
    key(items()[0], 'ArrowUp');
    expect(document.activeElement).toBe(items()[3]);
    key(items()[3], 'Home');
    expect(document.activeElement).toBe(items()[0]);
    key(items()[0], 'End');
    expect(document.activeElement).toBe(items()[3]);
  });

  it('jumps to an item by its first letter', async () => {
    await openByClick();
    key(items()[0], 'd');
    expect(document.activeElement).toBe(items()[2]);
    key(items()[2], 'd');
    expect(document.activeElement).toBe(items()[3]);
  });

  it('closes on Escape and returns focus to the button', async () => {
    await openByClick();
    key(items()[0], 'Escape');
    await fixture.whenStable();
    expect(isOpen()).toBeFalse();
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger());
  });

  it('closes on Tab without trapping focus', async () => {
    await openByClick();
    key(items()[0], 'Tab');
    expect(isOpen()).toBeFalse();
  });

  it('selects enabled items and ignores disabled ones', async () => {
    await openByClick();
    items()[1].click();
    expect(isOpen()).toBeTrue();
    expect(fixture.componentInstance.selected).toBe('');
    items()[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.selected).toBe('duplicate');
    expect(isOpen()).toBeFalse();
    expect(document.activeElement).toBe(trigger());
  });
});
