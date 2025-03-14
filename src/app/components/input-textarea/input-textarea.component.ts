import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  standalone: true,
  imports: [],
  template: '<textarea [placeholder]="placeholder" [disabled]="disabled" class="custom-input"></textarea>',
  styleUrl: './input-textarea.component.css'
})
export class InputTextareaComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() disabled: boolean = false;
}
