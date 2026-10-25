import { IconComponent } from '../icon/icon.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnChanges,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'lib-code',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CodeComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('codeBlock') codeBlock!: ElementRef<HTMLElement>;
  @Input() code: string | null = null;
  public copyButtonText = '';
  private resetTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit() {
    this.highlight();
  }
  ngOnChanges() {
    if (this.codeBlock) this.highlight();
  }
  private highlight() {
    if (this.code !== null) this.codeBlock.nativeElement.textContent = this.code;
    Prism.highlightElement(this.codeBlock.nativeElement);
  }

  public async copyCode() {
    const text = this.codeBlock?.nativeElement.textContent?.trim();
    if (!text) return;
    clearTimeout(this.resetTimer);
    try {
      await navigator.clipboard.writeText(text);
      this.copyButtonText = 'Copied!';
    } catch {
      this.copyButtonText = 'Unable to copy. Select the code and copy manually.';
    }
    this.resetTimer = setTimeout(() => (this.copyButtonText = ''), 4000);
  }

  ngOnDestroy() {
    clearTimeout(this.resetTimer);
  }
}
