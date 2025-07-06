import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './../../projects/libera-ui/src/lib/components/navigation-bar/navigation-bar.component';
import { SwitchThemeComponent } from './../../projects/libera-ui/src/lib/components/switch-theme/switch-theme.component';
import { FooterComponent } from './../../projects/libera-ui/src/lib/components/footer/footer.component';
import { FixedSideBarComponent } from './../../projects/libera-ui/src/lib/components/fixed-side-bar/fixed-side-bar.component';

@Component({
  selector: 'lib-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NavigationBarComponent,
    SwitchThemeComponent,
    FooterComponent,
    FixedSideBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'libera-ui';
}
