import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { Toast, ToastService } from './toast.service';
import { LIBERA_UI_TEXT } from '../../text';

/** Place once near the application root; it renders every toast from ToastService. */
@Component({
  selector: 'lib-toast-outlet',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastOutletComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() label = this.text.notifications;
  @Input() dismissLabel = this.text.dismissNotification;
  readonly service = inject(ToastService);
  trackById(_: number, toast: Toast) {
    return toast.id;
  }
}
