import { Component } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { CodeComponent } from '../../components/code/code.component';
import { ComponentsComponent } from '../components/components.component';
import { AnimationsComponent } from '../../components/animations/animations.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-card-site',
  standalone: true,
  imports: [CardComponent, CodeComponent, AnimationsComponent],
  templateUrl: './card-site.component.html',
  styleUrl: './card-site.component.css'
})
export class CardSiteComponent {
  public codeImport = `import { InputTextComponent } from '../../components/input-text/input-text.component';`;
  public codeInputText = `<app-input-text placeholder="Nome"></app-input-text>`;
  public codeDisabled = `<app-input-text placeholder="Nome" [disabled]="true"></app-input-text>`;
}
