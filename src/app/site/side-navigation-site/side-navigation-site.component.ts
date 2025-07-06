import { Component } from '@angular/core';
import { SideNavigationComponent } from '../../../../projects/libera-ui/src/lib/components/side-navigation/side-navigation.component';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';

@Component({
  selector: 'lib-side-navigation-site',
  standalone: true,
  imports: [SideNavigationComponent, CodeComponent, AnimationsComponent],
  templateUrl: './side-navigation-site.component.html',
  styleUrl: './side-navigation-site.component.css'
})
export class SideNavigationSiteComponent {
  public codeImport = `import { SideNavigationComponent } from 'libera-ui';`;
}
