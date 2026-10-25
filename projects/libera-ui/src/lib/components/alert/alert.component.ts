import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() title = '';
  @Input() tone: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Input({ transform: booleanAttribute }) dismissible = false;
  @Input() dismissLabel = 'Dismiss notification';
  @Input() visible = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() dismissed = new EventEmitter<void>();
  dismiss() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.dismissed.emit();
  }
}
