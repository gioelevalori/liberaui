import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-input-textarea',
  standalone: true,
  imports: [],
  template: '<textarea [placeholder]="placeholder" [attr.aria-label]="label || placeholder" [disabled]="disabled" class="custom-input"></textarea>',
  styleUrls: ['./input-textarea.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputTextareaComponent {
  @Input() label = '';
  @Input() placeholder: string = 'Inserisci testo...';
  @Input() disabled: boolean = false;
}
