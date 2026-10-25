import { TestBed } from '@angular/core/testing';
import { InputFileComponent } from '../projects/libera-ui/src/lib/components/input-file/input-file.component';

describe('File input', () => {
  it('shows a long file name without relying on duplicate element IDs', () => {
    const fixture = TestBed.createComponent(InputFileComponent);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const name = 'a-very-long-name-for-a-component-documentation-example.txt';
    Object.defineProperty(input, 'files', { value: [new File(['example'], name)] });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=status]').textContent).toBe(name);
    expect(input.parentElement?.tagName).toBe('LABEL');
    expect(input.id).toBe('');
  });
});
