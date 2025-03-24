import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `<footer><ng-content></ng-content></footer>`,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
