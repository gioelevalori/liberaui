import { TestBed } from '@angular/core/testing';
import { InputCheckboxComponent } from '../projects/libera-ui/src/lib/components/input-checkbox/input-checkbox.component';

describe('Checkbox interaction', () => {
  it('keeps native state, accessible name, and change output synchronized', () => {
    const fixture = TestBed.createComponent(InputCheckboxComponent);
    fixture.componentInstance.label = 'Enable notifications';
    const changed = spyOn(fixture.componentInstance.checkedChange,'emit');
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Enable notifications');
    expect(input.checked).toBeTrue(); input.click(); fixture.detectChanges();
    expect(fixture.componentInstance.checked).toBeFalse(); expect(changed).toHaveBeenCalledWith(false);
    fixture.componentInstance.disabled = true; fixture.detectChanges();
    expect(input.disabled).toBeTrue();
  });
});
