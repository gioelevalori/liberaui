import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [],
  template: '<pre><code #codeBlock class="language-javascript"><ng-content></ng-content></code></pre>',
  styleUrls: ['./code.component.css', '../font.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CodeComponent {
  @ViewChild('codeBlock', { static: false }) codeBlock!: ElementRef;

  ngAfterViewChecked() {
    if (this.codeBlock) {
      Prism.highlightElement(this.codeBlock.nativeElement);
    }
  }
}
