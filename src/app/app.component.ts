import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SwitchThemeComponent } from './components/switch-theme/switch-theme.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterModule, 
    SideNavigationComponent,
    NavigationBarComponent,
    SwitchThemeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-library';
}
