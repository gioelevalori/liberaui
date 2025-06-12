import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  template: `
  <div class="tab">
  <button class="tablinks">London</button>
  <button class="tablinks">Paris</button>
  <button class="tablinks">Tokyo</button>
</div>

<div id="London" class="tabcontent">
  <h3>London</h3>
  <p>London is the capital city of England.</p>
</div>

<div id="Paris" class="tabcontent">
  <h3>Paris</h3>
  <p>Paris is the capital of France.</p>
</div>

<div id="Tokyo" class="tabcontent">
  <h3>Tokyo</h3>
  <p>Tokyo is the capital of Japan.</p>
</div>`,
  styleUrls: ['./tab.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent {

}
