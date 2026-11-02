import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';

@Component({
  standalone: true,
  imports: [DialogComponent],
  template: `<button id="opener" type="button" (click)="open = true">Open</button>
    <lib-dialog
      title="Delete project"
      description="This cannot be undone."
      [dismissible]="dismissible"
      [(open)]="open"
      (closed)="closedWith = $event"
    >
      <p>Body</p>
      <button id="confirm" dialog-actions type="button" (click)="open = false">Delete</button>
    </lib-dialog>`,
})
class HostComponent {
  open = false;
  dismissible = true;
  closedWith = '';
}

describe('DialogComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const dialog = () => fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
  const opener = () => fixture.nativeElement.querySelector('#opener') as HTMLButtonElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  });

  afterEach(() => fixture.nativeElement.remove());

  async function openFromButton() {
    opener().focus();
    opener().click();
    await fixture.whenStable();
  }

  it('opens as a labelled modal and focuses its content', async () => {
    expect(dialog().open).toBeFalse();
    await openFromButton();
    const el = dialog();
    expect(el.open).toBeTrue();
    expect(el.matches(':modal')).toBeTrue();
    expect(document.getElementById(el.getAttribute('aria-labelledby')!)?.textContent).toBe(
      'Delete project',
    );
    expect(document.getElementById(el.getAttribute('aria-describedby')!)?.textContent).toContain(
      'cannot be undone',
    );
    expect(el.contains(document.activeElement)).toBeTrue();
  });

  it('closes on Escape, updates the binding and restores focus', async () => {
    await openFromButton();
    dialog().dispatchEvent(new Event('cancel', { cancelable: true }));
    await fixture.whenStable();
    expect(dialog().open).toBeFalse();
    expect(host.open).toBeFalse();
    expect(host.closedWith).toBe('dismiss');
    expect(document.activeElement).toBe(opener());
  });

  it('keeps a non-dismissible dialog open on Escape and backdrop clicks', async () => {
    host.dismissible = false;
    await openFromButton();
    const cancel = new Event('cancel', { cancelable: true });
    dialog().dispatchEvent(cancel);
    dialog().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(cancel.defaultPrevented).toBeTrue();
    expect(dialog().open).toBeTrue();
    expect(fixture.nativeElement.querySelector('.lib-dialog-close')).toBeNull();
  });

  it('closes when the backdrop is clicked', async () => {
    await openFromButton();
    dialog().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(dialog().open).toBeFalse();
    expect(host.open).toBeFalse();
  });

  it('stays in sync when the native element closes itself and can reopen', async () => {
    await openFromButton();
    dialog().close();
    // The native close event is dispatched in a later task.
    await new Promise((resolve) => setTimeout(resolve, 50));
    await fixture.whenStable();
    expect(host.open).toBeFalse();
    expect(host.closedWith).toBe('dismiss');
    expect(document.activeElement).toBe(opener());

    await openFromButton();
    expect(dialog().open).toBeTrue();
  });

  it('closes from the close button and from a bound open value', async () => {
    await openFromButton();
    (fixture.nativeElement.querySelector('.lib-dialog-close') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(dialog().open).toBeFalse();
    expect(host.closedWith).toBe('dismiss');

    await openFromButton();
    (fixture.nativeElement.querySelector('#confirm') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(dialog().open).toBeFalse();
    expect(document.activeElement).toBe(opener());
  });
});
