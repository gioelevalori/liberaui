import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-navigation-bar-site',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './navigation-bar-site.component.html',
  styleUrl: './navigation-bar-site.component.css'
})
export class NavigationBarSiteComponent {

}
