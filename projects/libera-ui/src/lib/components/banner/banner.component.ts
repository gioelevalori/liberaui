import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `
  <section class="ban_sec">
    <div class="container">
      <div class="ban_img">
        <ng-content select="[ban_img]"></ng-content>
        <div class="ban_text">
          <ng-content select="[ban_text]"></ng-content>
        </div>
      </div>
    </div>
  </section>
`,
  styleUrls: ['./banner.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent {
}
