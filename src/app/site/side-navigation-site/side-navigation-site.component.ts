import { Component } from '@angular/core';
import { SideNavigationComponent } from '../../components/side-navigation/side-navigation.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

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
