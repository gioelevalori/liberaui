import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}
@Component({
  selector: 'lib-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input() openIds: string[] = [];
  @Output() openIdsChange = new EventEmitter<string[]>();
  toggle(event: Event, item: AccordionItem) {
    event.preventDefault();
    if (item.disabled) return;
    this.openIds = this.openIds.includes(item.id)
      ? this.openIds.filter((id) => id !== item.id)
      : this.multiple
        ? [...this.openIds, item.id]
        : [item.id];
    this.openIdsChange.emit([...this.openIds]);
  }
}
