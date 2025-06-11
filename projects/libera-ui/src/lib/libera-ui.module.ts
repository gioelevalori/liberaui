import { NgModule } from '@angular/core';
import { AnimationsComponent } from './components/animations/animations.component';
import { ButtonComponent } from './components/button/button.component';
import { FixedSideBarComponent } from './components/fixed-side-bar/fixed-side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SelectComponent } from './components/select/select.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { SwitchThemeComponent } from './components/switch-theme/switch-theme.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [],
  imports: [
    ButtonComponent,
    FixedSideBarComponent,
    FooterComponent,
    AnimationsComponent,
    InputCheckboxComponent,
    InputDateComponent,
    InputFileComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputTextComponent,
    InputTextareaComponent,
    NavigationBarComponent,
    SelectComponent,
    SideNavigationComponent,
    SwitchThemeComponent,
    TableComponent
  ],
  exports: [ // <--- AGGIUNGI QUESTO BLOCCO
    ButtonComponent,
    FixedSideBarComponent,
    FooterComponent,
    AnimationsComponent,
    InputCheckboxComponent,
    InputDateComponent,
    InputFileComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputTextComponent,
    InputTextareaComponent,
    NavigationBarComponent,
    SelectComponent,
    SideNavigationComponent,
    SwitchThemeComponent,
    TableComponent
  ],
  providers: [],
  bootstrap: []
})
export class LiberaUIModule { }
