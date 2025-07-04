import { Component } from '@angular/core';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'lib-banner-site',
  standalone: true,
  imports: [BannerComponent, AnimationsComponent],
  templateUrl: './banner-site.component.html',
  styleUrl: './banner-site.component.css'
})
export class BannerSiteComponent {
}
