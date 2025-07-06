import { Component } from '@angular/core';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';
import { BannerComponent } from '../../../../projects/libera-ui/src/lib/components/banner/banner.component';

@Component({
  selector: 'lib-banner-site',
  standalone: true,
  imports: [BannerComponent, AnimationsComponent],
  templateUrl: './banner-site.component.html',
  styleUrl: './banner-site.component.css'
})
export class BannerSiteComponent {
}
