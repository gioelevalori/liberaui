import { Component } from '@angular/core';
import { SideNavigationComponent } from '../../components/side-navigation/side-navigation.component';

@Component({
  selector: 'app-side-navigation-site',
  standalone: true,
  imports: [SideNavigationComponent],
  templateUrl: './side-navigation-site.component.html',
  styleUrl: './side-navigation-site.component.css'
})
export class SideNavigationSiteComponent {

}
