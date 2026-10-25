import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../projects/libera-ui/src/lib/components/input-text/input-text.component';
import { InputNumberComponent } from '../../../../projects/libera-ui/src/lib/components/input-number/input-number.component';
import { InputPasswordComponent } from '../../../../projects/libera-ui/src/lib/components/input-password/input-password.component';
import { InputTextareaComponent } from '../../../../projects/libera-ui/src/lib/components/input-textarea/input-textarea.component';
import { SelectComponent } from '../../../../projects/libera-ui/src/lib/components/select/select.component';
import { InputCheckboxComponent } from '../../../../projects/libera-ui/src/lib/components/input-checkbox/input-checkbox.component';
import { ButtonComponent } from '../../../../projects/libera-ui/src/lib/components/button/button.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
@Component({
 selector:'lib-forms-lab',standalone:true,
 imports:[CommonModule,ReactiveFormsModule,InputTextComponent,InputNumberComponent,InputPasswordComponent,InputTextareaComponent,SelectComponent,InputCheckboxComponent,ButtonComponent,CodeComponent],
 template:`<div class="content-page"><h1>Forms that stay in sync.</h1><p>Edit a field, reset the form, or disable it. The values below come directly from Angular reactive forms. This example stays on your device.</p>
 <form [formGroup]="form" (ngSubmit)="save()" class="forms-demo lib-glass-panel">
 <div><span>Workspace name</span><lib-input-text label="Workspace name" formControlName="name" required /></div>
 <div><span>Team size</span><lib-input-number label="Team size" formControlName="size" [min]="1" [max]="50" [step]="1" /></div>
 <div><span>Plan · numeric value</span><lib-select label="Plan" formControlName="plan" [options]="plans" /></div>
 <div><span>Password</span><lib-input-password label="Password" formControlName="password" /></div>
 <div class="wide"><span>Notes</span><lib-input-textarea label="Notes" formControlName="notes" /></div>
 <div class="wide"><lib-input-checkbox formControlName="updates" label="Receive product updates" /> Receive product updates</div>
 <div class="form-actions wide"><lib-button type="submit" [disabled]="form.disabled || form.invalid">Preview save</lib-button><lib-button variant="outline" [disabled]="form.disabled" (click)="reset()">Reset form</lib-button></div>
 <p class="wide feedback" role="status">{{ message }}</p>
 </form>
 <button class="form-disable" type="button" (click)="toggleDisabled()">{{ form.disabled ? 'Enable the form' : 'Disable the form' }}</button>
 <h2>Live form values</h2><p>The password is hidden from this display. Numeric plan values stay numbers when selected.</p><lib-code [code]="values" />
 <h2>Use reactive forms</h2><p>Import <code>ReactiveFormsModule</code> and the LiberaUI components into your standalone component. Use <code>formControlName</code> or <code>[formControl]</code>. Template-driven forms with <code>ngModel</code> are supported too.</p><lib-code [code]="example" /></div>`,
 styles:[`.forms-demo{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:28px;border:1px solid var(--border-color);border-radius:16px;background:var(--lib-panel-background,var(--background-color));margin-top:28px}.forms-demo>div{min-width:0}.forms-demo span{display:block;font-size:12px;color:var(--text-secondary)}.wide{grid-column:1/-1}.form-actions{display:flex;gap:10px;flex-wrap:wrap}.feedback{font-size:12px;color:var(--text-secondary);margin:0;min-height:20px}.form-disable{margin:20px 0;border:1px solid var(--border-color);padding:10px 14px;border-radius:8px;background:var(--surface-color);color:var(--text-primary);cursor:pointer}@media(max-width:600px){.forms-demo{grid-template-columns:1fr;padding:20px}}`]
})
export class FormsLabComponent {
 readonly initial={name:'Design studio',size:4,plan:2,password:'',notes:'A place for the next idea.',updates:true};
 readonly form=new FormGroup({
  name:new FormControl(this.initial.name,{nonNullable:true,validators:[Validators.required]}),
  size:new FormControl<number|null>(this.initial.size,[Validators.required,Validators.min(1),Validators.max(50)]),
  plan:new FormControl<number|string|null>(2),password:new FormControl(''),notes:new FormControl(this.initial.notes),updates:new FormControl(true)
 });
 readonly plans=[{value:1,label:'Personal'},{value:2,label:'Team'},{value:3,label:'Organization'}];
 message='';
 readonly example="import { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { InputTextComponent } from 'libera-ui';\n// Add both modules/components to your standalone imports.\nname = new FormControl('Design studio');\n\n<lib-input-text label=\"Workspace\" [formControl]=\"name\" />";
 get values(){const value=this.form.getRawValue();return JSON.stringify({...value,password:value.password?'••••••':''},null,2);}
 save(){if(this.form.valid)this.message='Saved locally for this preview. Nothing was sent to a server.';}
 reset(){this.form.reset(this.initial);this.message='Form reset to its initial values.';}
 toggleDisabled(){this.form.disabled?this.form.enable():this.form.disable();this.message=this.form.disabled?'All controls are disabled.':'All controls are enabled.';}
}
