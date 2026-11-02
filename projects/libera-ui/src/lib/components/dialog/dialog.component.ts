import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

export type DialogCloseReason = 'dismiss' | 'close';
let nextDialogId = 0;

/** Modal dialog built on the native element: the browser makes the page inert and traps focus. */
@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() title = '';
  @Input() description = '';
  @Input({ transform: booleanAttribute }) open = false;
  @Input({ transform: booleanAttribute }) dismissible = true;
  @Input() closeLabel = 'Close dialog';
  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<DialogCloseReason>();
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  readonly uid = 'lib-dialog-' + nextDialogId++;
  private returnFocus: HTMLElement | null = null;

  ngAfterViewInit() {
    this.sync('close');
  }
  ngOnChanges() {
    if (this.dialog) this.sync('close');
  }
  ngOnDestroy() {
    this.open = false;
    if (this.dialog?.nativeElement.open) this.dialog.nativeElement.close();
  }

  dismiss() {
    if (!this.dismissible || !this.open) return;
    this.open = false;
    this.openChange.emit(false);
    this.sync('dismiss');
  }
  onCancel(event: Event) {
    event.preventDefault();
    this.dismiss();
  }
  /** A form with method="dialog" or other native code can close the element directly. */
  onClose() {
    if (!this.open) return;
    this.open = false;
    this.openChange.emit(false);
    this.returnFocus?.focus();
    this.returnFocus = null;
    this.closed.emit('dismiss');
  }
  onClick(event: MouseEvent) {
    // Content sits in an inner panel, so a click on the element itself is a backdrop click.
    if (event.target === this.dialog.nativeElement) this.dismiss();
  }

  private sync(reason: DialogCloseReason) {
    const el = this.dialog.nativeElement;
    if (typeof el.showModal !== 'function' || el.open === this.open) return;
    if (this.open) {
      this.returnFocus = el.ownerDocument.activeElement as HTMLElement | null;
      el.showModal();
      return;
    }
    el.close();
    this.returnFocus?.focus();
    this.returnFocus = null;
    this.closed.emit(reason);
  }
}
