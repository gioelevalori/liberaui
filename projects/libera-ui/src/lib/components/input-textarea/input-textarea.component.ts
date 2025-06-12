import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  standalone: true,
  imports: [],
  template: '<textarea [placeholder]="placeholder" [disabled]="disabled" class="custom-input"></textarea>',
  styleUrls: ['./input-textarea.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputTextareaComponent {
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() disabled: boolean = false;
}
