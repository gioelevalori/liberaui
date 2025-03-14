import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: '<select (change)="onChange($event)" class="custom-input"><option value="" disabled selected>{{ placeholder }}</option><option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option></select>',
  styleUrl: './select.component.css'
})

export class SelectComponent {
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
