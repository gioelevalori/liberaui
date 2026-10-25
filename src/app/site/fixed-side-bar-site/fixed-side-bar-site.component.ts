import { Component } from '@angular/core';
import { FixedSideBarComponent } from '../../../../projects/libera-ui/src/lib/components/fixed-side-bar/fixed-side-bar.component';


@Component({
  selector: 'lib-fixed-side-bar-site',
  standalone: true,
  imports: [FixedSideBarComponent],
  templateUrl: './fixed-side-bar-site.component.html',
  styleUrl: './fixed-side-bar-site.component.css'
})
export class FixedSideBarSiteComponent {

}

