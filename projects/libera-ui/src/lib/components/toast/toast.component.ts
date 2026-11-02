import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { Toast, ToastService } from './toast.service';

/** Place once near the application root; it renders every toast from ToastService. */
@Component({
  selector: 'lib-toast-outlet',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastOutletComponent {
  @Input() label = 'Notifications';
  @Input() dismissLabel = 'Dismiss notification';
  readonly service = inject(ToastService);
  trackById(_: number, toast: Toast) {
    return toast.id;
  }
}
