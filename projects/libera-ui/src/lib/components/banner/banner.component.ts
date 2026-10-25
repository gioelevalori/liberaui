import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent {}
