import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule],
  template: '<select [attr.aria-label]="label || placeholder" (change)="onChange($event)" class="custom-input" [disabled]="disabled"><option value="" disabled selected>{{ placeholder }}</option><option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option></select>',
  styleUrls: ['./select.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})

export class SelectComponent {
  @Input() label = '';
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() disabled: boolean = false;
  @Input() options: SelectOption[] = [];
  @Input() selectedValue?: string | number;
  @Output() selectionChange = new EventEmitter<string | number>();

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectionChange.emit(value);
  }
}
