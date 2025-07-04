import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import Prism from 'prismjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lib-code',
  standalone: true,
  imports: [ButtonComponent],
  template: `<pre><code #codeBlock class="language-javascript"><ng-content></ng-content></code><lib-button class="copy-button" (click)="copyCode()">{{ copyButtonText }}</lib-button></pre>`,
  styleUrl: './code.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CodeComponent {
  @ViewChild('codeBlock', { static: false }) codeBlock!: ElementRef;
  public copyButtonText = 'Copy';
  ngAfterViewChecked() {
    if (this.codeBlock) {
      Prism.highlightElement(this.codeBlock.nativeElement);
    }
  }

  public copyCode() {
    const codeElement = this.codeBlock?.nativeElement;
    if (!codeElement) return;

    const text = codeElement.textContent?.trim() || '';

    navigator.clipboard.writeText(text).catch(() => {
    });
  }
}
