import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastOutletComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastService and ToastOutletComponent', () => {
  let service: ToastService;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2026, 0, 1));
    TestBed.configureTestingModule({
      imports: [ToastOutletComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(ToastService);
  });

  afterEach(() => jasmine.clock().uninstall());

  it('dismisses toasts after their duration and keeps sticky ones', () => {
    service.show({ message: 'Saved', duration: 1000 });
    const sticky = service.show({ message: 'Offline', duration: 0 });
    jasmine.clock().tick(999);
    expect(service.toasts().length).toBe(2);
    jasmine.clock().tick(1);
    expect(service.toasts().map((t) => t.id)).toEqual([sticky]);
  });

  it('pauses the timer and resumes with the remaining time', () => {
    const id = service.show({ message: 'Saved', duration: 1000 });
    jasmine.clock().tick(600);
    service.pause(id);
    jasmine.clock().tick(5000);
    expect(service.toasts().length).toBe(1);
    service.resume(id);
    jasmine.clock().tick(399);
    expect(service.toasts().length).toBe(1);
    jasmine.clock().tick(1);
    expect(service.toasts().length).toBe(0);
  });

  it('renders announcements and dismisses from the button', () => {
    const fixture = TestBed.createComponent(ToastOutletComponent);
    fixture.detectChanges();
    const region: HTMLElement = fixture.nativeElement.querySelector('[aria-live]');
    expect(region.getAttribute('aria-live')).toBe('polite');

    service.show({ title: 'Saved', message: 'Your changes are live.', tone: 'success' });
    service.show({ message: 'Payment failed', tone: 'danger' });
    fixture.detectChanges();
    const toasts = fixture.nativeElement.querySelectorAll('.lib-toast');
    expect(toasts.length).toBe(2);
    expect(toasts[0].textContent).toContain('Your changes are live.');
    expect(toasts[0].getAttribute('role')).toBeNull();
    expect(toasts[1].getAttribute('role')).toBe('alert');

    const close = toasts[0].querySelector('button') as HTMLButtonElement;
    expect(close.getAttribute('aria-label')).toBe('Dismiss notification');
    close.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.lib-toast').length).toBe(1);
  });

  it('pauses while a toast is focused', () => {
    const fixture = TestBed.createComponent(ToastOutletComponent);
    service.show({ message: 'Saved', duration: 1000 });
    fixture.detectChanges();
    const toast: HTMLElement = fixture.nativeElement.querySelector('.lib-toast');
    toast.dispatchEvent(new FocusEvent('focusin'));
    jasmine.clock().tick(2000);
    expect(service.toasts().length).toBe(1);
    toast.dispatchEvent(new FocusEvent('focusout'));
    jasmine.clock().tick(1000);
    expect(service.toasts().length).toBe(0);
  });
});

describe('ToastOutletComponent without zone.js', () => {
  it('renders toasts shown from outside a template event', async () => {
    TestBed.configureTestingModule({
      imports: [ToastOutletComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(ToastOutletComponent);
    await fixture.whenStable();
    TestBed.inject(ToastService).show({ message: 'Synced', duration: 0 });
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.lib-toast')?.textContent).toContain('Synced');
  });
});
