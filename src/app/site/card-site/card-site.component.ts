import { Component } from '@angular/core';
import { CodeComponent } from '../../components/code/code.component';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-card-site',
  standalone: true,
  imports: [CardComponent, AnimationsComponent, CodeComponent],
  templateUrl: './card-site.component.html',
  styleUrl: './card-site.component.css'
})
export class CardSiteComponent {
  public codeHtml = `
  <app-card>
    <h1>Input Text</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
  </app-card>
  `;
}
