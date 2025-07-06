import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../projects/libera-ui/src/lib/components/button/button.component";
import { RouterModule } from '@angular/router';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';
import { BannerComponent } from '../../../../projects/libera-ui/src/lib/components/banner/banner.component';
import { CardComponent } from '../../../../projects/libera-ui/src/lib/components/card/card.component';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [ButtonComponent, RouterModule, AnimationsComponent, BannerComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
