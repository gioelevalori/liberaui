import { IconComponent } from '../icon/icon.component';
import { booleanAttribute, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueControl } from '../form-value-control';
@Component({
 selector:'lib-input-password',standalone:true,imports:[IconComponent],
 template:`<div class="lib-password-field"><input [type]="visible ? 'text' : type" [placeholder]="placeholder" [attr.aria-label]="label || placeholder" [disabled]="disabled" [required]="required" [value]="value ?? ''" (input)="commit($any($event.target).value)" (blur)="touched()" class="custom-input" autocomplete="current-password"><button type="button" [disabled]="disabled" [attr.aria-label]="visible ? 'Hide password' : 'Show password'" [attr.aria-pressed]="visible" (click)="visible = !visible"><lib-icon [name]="visible ? 'eye-off' : 'eye'" [size]="18" /></button></div>`,
 styleUrls:['./input-password.component.css','../font.css'],encapsulation:ViewEncapsulation.None,
 providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>InputPasswordComponent),multi:true}]
})
export class InputPasswordComponent extends FormValueControl<string> {
 @Input() label = '';
 @Input() placeholder = 'Your password';
 @Input({transform:booleanAttribute}) required = false;
 @Input() type = 'password';
 visible = false;
}
