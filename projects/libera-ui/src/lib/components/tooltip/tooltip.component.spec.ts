import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

@Component({
  standalone: true,
  imports: [TooltipComponent],
  template: `<lib-tooltip text="Copy link"
    ><button type="button" aria-label="Copy">C</button></lib-tooltip
  >`,
})
class HostComponent {}

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement.querySelector('lib-tooltip') as HTMLElement;
  const tip = () => fixture.nativeElement.querySelector('[role="tooltip"]') as HTMLElement;
  const button = () => fixture.nativeElement.querySelector('button') as HTMLButtonElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    fixture.nativeElement.remove();
  });

  it('describes the first focusable element', () => {
    expect(tip().textContent?.trim()).toBe('Copy link');
    expect(button().getAttribute('aria-describedby')).toBe(tip().id);
  });

  it('shows immediately on keyboard focus and hides on blur', () => {
    button().focus();
    expect(tip().matches(':popover-open')).toBeTrue();
    button().blur();
    expect(tip().matches(':popover-open')).toBeFalse();
  });

  it('shows after a short hover delay and stays while the pointer is inside', () => {
    jasmine.clock().install();
    host().dispatchEvent(new MouseEvent('mouseenter'));
    jasmine.clock().tick(299);
    expect(tip().matches(':popover-open')).toBeFalse();
    jasmine.clock().tick(1);
    expect(tip().matches(':popover-open')).toBeTrue();
    host().dispatchEvent(new MouseEvent('mouseleave'));
    expect(tip().matches(':popover-open')).toBeFalse();
  });

  it('can be dismissed with Escape without moving focus', () => {
    button().focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(tip().matches(':popover-open')).toBeFalse();
    expect(document.activeElement).toBe(button());
  });

  it('cancels a pending hover when the pointer leaves first', () => {
    jasmine.clock().install();
    host().dispatchEvent(new MouseEvent('mouseenter'));
    host().dispatchEvent(new MouseEvent('mouseleave'));
    jasmine.clock().tick(500);
    expect(tip().matches(':popover-open')).toBeFalse();
  });
});
