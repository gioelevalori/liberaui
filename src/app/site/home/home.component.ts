import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { RouterModule } from '@angular/router';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [ButtonComponent, RouterModule, AnimationsComponent, BannerComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
