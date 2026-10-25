import { Component } from '@angular/core';
import { SwitchThemeComponent } from '../../../../projects/libera-ui/src/lib/components/switch-theme/switch-theme.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-switch-theme-site',
  standalone: true,
  imports: [SwitchThemeComponent, CodeComponent, AnimationsComponent],
  templateUrl: './switch-theme-site.component.html',
  styleUrl: './switch-theme-site.component.css',
})
export class SwitchThemeSiteComponent {
  public codeImport = `import { SwitchThemeComponent } from 'libera-ui';`;
  public codeSwitchTheme = `<lib-switch-theme></lib-switch-theme>`;
}
