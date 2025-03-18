import { Component } from '@angular/core';
import { SwitchThemeComponent } from '../../components/switch-theme/switch-theme.component';
import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-switch-theme-site',
  standalone: true,
  imports: [SwitchThemeComponent, CodeComponent],
  templateUrl: './switch-theme-site.component.html',
  styleUrl: './switch-theme-site.component.css'
})
export class SwitchThemeSiteComponent {
  public codeImport = `import { SwitchThemeComponent } from '../../components/switch-theme/switch-theme.component';`;
}
