import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LIBERA_UI_TEXT } from '../../text';
@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  protected readonly text = inject(LIBERA_UI_TEXT);
  @Input() title = '';
  @Input() tone: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Input({ transform: booleanAttribute }) dismissible = false;
  @Input() dismissLabel = this.text.dismissNotification;
  @Input() visible = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() dismissed = new EventEmitter<void>();
  dismiss() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.dismissed.emit();
  }
}
