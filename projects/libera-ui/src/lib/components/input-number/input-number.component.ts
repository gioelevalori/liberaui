import { booleanAttribute, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
@Component({
 selector:'lib-input-number', standalone:true, template: `<input [type]="type" [attr.min]="min" [attr.max]="max" [attr.step]="step" [placeholder]="placeholder" [attr.aria-label]="label || placeholder" [disabled]="disabled" [value]="value ?? ''" [required]="required" (input)="readNumber($event)" (blur)="touched()" class="custom-input">`,
 styleUrls:['./input-number.component.css','../font.css'], encapsulation:ViewEncapsulation.None,
 providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>InputNumberComponent),multi:true}]
})
export class InputNumberComponent extends FormValueControl<number> {
 @Input() label = '';
 @Input() placeholder = 'Enter a value';
 @Input({transform:booleanAttribute}) required = false;
 @Input() type = 'number';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step: number | string = 'any';
 readNumber(event:Event) { const value=(event.target as HTMLInputElement).valueAsNumber; this.commit(Number.isNaN(value) ? null : value); }
}
