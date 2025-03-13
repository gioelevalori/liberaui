import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { TableComponent } from './table/table.component';
import { SelectComponent, SelectOption } from './select/select.component';
import { SwitchThemeComponent } from "./switch-theme/switch-theme.component";
import { AnimationsComponent } from './animations/animations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent, InputTextComponent, InputNumberComponent,
    InputTextareaComponent, InputPasswordComponent, InputDateComponent, InputFileComponent, InputCheckboxComponent, TableComponent, SelectComponent, SwitchThemeComponent, AnimationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-library';

  public cities: SelectOption[] = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

}
