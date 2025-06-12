import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `<footer><ng-content></ng-content></footer>`,
  styleUrls: ['./footer.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {

}
