import { Component } from '@angular/core';
import { SwitchThemeComponent } from '../../components/switch-theme/switch-theme.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

@Component({
  selector: 'app-switch-theme-site',
  standalone: true,
  imports: [SwitchThemeComponent, CodeComponent, AnimationsComponent],
  templateUrl: './switch-theme-site.component.html',
  styleUrl: './switch-theme-site.component.css'
})
export class SwitchThemeSiteComponent {
  public codeImport = `import { SwitchThemeComponent } from '../../components/switch-theme/switch-theme.component';`;
  public codeSwitchTheme = `<app-switch-theme></app-switch-theme>`;
}
