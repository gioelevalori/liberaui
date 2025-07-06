import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../../../projects/libera-ui/src/lib/components/navigation-bar/navigation-bar.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-navigation-bar-site',
  standalone: true,
  imports: [NavigationBarComponent, CodeComponent, AnimationsComponent],
  templateUrl: './navigation-bar-site.component.html',
  styleUrl: './navigation-bar-site.component.css'
})
export class NavigationBarSiteComponent {
  public codeImport = `import { NavigationBarComponent } from 'libera-ui';`;
}
