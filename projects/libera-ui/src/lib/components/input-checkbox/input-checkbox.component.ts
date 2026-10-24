import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector:'lib-input-checkbox', standalone:true,
  template:`<label class="lib-checkbox" [style.--checkbox-color]="color || null"><input type="checkbox" [disabled]="disabled" [checked]="checked" [attr.aria-label]="label" (change)="change($event)"><span class="checkmark" aria-hidden="true"></span></label>`,
  styleUrls:['./input-checkbox.component.css','../font.css'], encapsulation:ViewEncapsulation.None,
})
export class InputCheckboxComponent {
  @Input() disabled = false;
  @Input() color = '';
  @Input() checked = true;
  @Input() label = 'Checkbox';
  @Output() checkedChange = new EventEmitter<boolean>();
  change(event:Event) { this.checked = (event.target as HTMLInputElement).checked; this.checkedChange.emit(this.checked); }
}
