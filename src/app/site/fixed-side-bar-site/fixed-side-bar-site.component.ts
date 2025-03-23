import { Component } from '@angular/core';
import { FixedSideBarComponent } from '../../components/fixed-side-bar/fixed-side-bar.component';

@Component({
  selector: 'app-fixed-side-bar-site',
  standalone: true,
  imports: [FixedSideBarComponent],
  templateUrl: './fixed-side-bar-site.component.html',
  styleUrl: './fixed-side-bar-site.component.css'
})
export class FixedSideBarSiteComponent {

}
