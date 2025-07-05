import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';

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
