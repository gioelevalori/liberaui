import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';

@Component({
  selector: 'app-navigation-bar-site',
  standalone: true,
  imports: [NavigationBarComponent, CodeComponent, ComponentsComponent],
  templateUrl: './navigation-bar-site.component.html',
  styleUrl: './navigation-bar-site.component.css'
})
export class NavigationBarSiteComponent {
  public codeImport = `import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';`;
}
