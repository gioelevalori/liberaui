import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from './components/button/button.module';
import { FixedSideBarModule } from './components/fixed-side-bar/fixed-side-bar.module';
import { FooterModule } from './components/footer/footer.module';
import { AnimationsModule } from './components/animations/animations.module';
import { InputCheckboxModule } from './components/input-checkbox/input-checkbox.module';
import { InputDateModule } from './components/input-date/input-date.module';
import { InputFileModule } from './components/input-file/input-file.module';
import { InputNumberModule } from './components/input-number/input-number.module';
import { InputPasswordModule } from './components/input-password/input-password.module';
import { InputTextModule } from './components/input-text/input-text.module';
import { InputTextareaModule } from './components/input-textarea/input-textarea.module';
import { NavigationBarModule } from './components/navigation-bar/navigation-bar.module';
import { SelectModule } from './components/select/select.module';
import { SideNavigationModule } from './components/side-navigation/side-navigation.module';
import { SwitchThemeModule } from './components/switch-theme/switch-theme.module';
import { TableModule } from './components/table/table.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ButtonModule,
    FixedSideBarModule,
    FooterModule,
    AnimationsModule,
    InputCheckboxModule,
    InputDateModule,
    InputFileModule,
    InputNumberModule,
    InputPasswordModule,
    InputTextModule,
    InputTextareaModule,
    NavigationBarModule,
    SelectModule,
    SideNavigationModule,
    SwitchThemeModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
