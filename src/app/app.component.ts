import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { TableComponent } from './components/table/table.component';
import { SelectComponent, SelectOption } from './components/select/select.component';
import { SwitchThemeComponent } from "./components/switch-theme/switch-theme.component";
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { AnimationsComponent } from './components/animations/animations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent, InputTextComponent, InputNumberComponent,
    InputTextareaComponent, InputPasswordComponent, InputDateComponent, InputFileComponent, InputCheckboxComponent, TableComponent, SelectComponent, SwitchThemeComponent,
    AnimationsComponent, NavigationBarComponent, SideNavigationComponent],
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
