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
  selector: 'lib-forms-lab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputTextareaComponent,
    SelectComponent,
    InputCheckboxComponent,
    ButtonComponent,
    CodeComponent,
  ],
  templateUrl: './forms-lab.component.html',
  styleUrl: './forms-lab.component.css',
})
export class FormsLabComponent {
  readonly initial = {
    name: 'Design studio',
    size: 4,
    plan: 2,
    password: '',
    notes: 'A place for the next idea.',
    updates: true,
  };
  readonly form = new FormGroup({
    name: new FormControl(this.initial.name, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    size: new FormControl<number | null>(this.initial.size, [
      Validators.required,
      Validators.min(1),
      Validators.max(50),
    ]),
    plan: new FormControl<number | string | null>(2),
    password: new FormControl(''),
    notes: new FormControl(this.initial.notes),
    updates: new FormControl(true),
  });
  readonly plans = [
    { value: 1, label: 'Personal' },
    { value: 2, label: 'Team' },
    { value: 3, label: 'Organization' },
  ];
  message = '';
  readonly example =
    "import { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { InputTextComponent } from 'libera-ui';\n// Add both modules/components to your standalone imports.\nname = new FormControl('Design studio');\n\n<lib-input-text label=\"Workspace\" [formControl]=\"name\" />";
  get values() {
    const value = this.form.getRawValue();
    return JSON.stringify({ ...value, password: value.password ? '••••••' : '' }, null, 2);
  }
  save() {
    if (this.form.valid)
      this.message = 'Saved locally for this preview. Nothing was sent to a server.';
  }
  reset() {
    this.form.reset(this.initial);
    this.message = 'Form reset to its initial values.';
  }
  toggleDisabled() {
    this.form.disabled ? this.form.enable() : this.form.disable();
    this.message = this.form.disabled ? 'All controls are disabled.' : 'All controls are enabled.';
  }
}
