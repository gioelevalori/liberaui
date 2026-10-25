import { Component } from '@angular/core';
import { CodeComponent } from '../../../../projects/libera-ui/src/lib/components/code/code.component';
import { AnimationsComponent } from '../../../../projects/libera-ui/src/lib/components/animations/animations.component';
import { CardComponent } from '../../../../projects/libera-ui/src/lib/components/card/card.component';

@Component({
  selector: 'lib-card-site',
  standalone: true,
  imports: [CardComponent, AnimationsComponent, CodeComponent],
  templateUrl: './card-site.component.html',
  styleUrl: './card-site.component.css',
})
export class CardSiteComponent {
  public codeHtml = `
  <lib-card>
    <h1>Input Text</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
  </lib-card>
  `;
}
