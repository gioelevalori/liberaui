import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupComponent, RadioOption } from './radio-group.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RadioGroupComponent],
  template: `<lib-radio-group label="Plan" [options]="options" [formControl]="plan" />
    <lib-radio-group label="Second" [options]="options" />`,
})
class HostComponent {
  plan = new FormControl<string | null>('team');
  options: RadioOption[] = [
    { value: 'solo', label: 'Solo', description: 'One seat' },
    { value: 'team', label: 'Team' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ];
}

describe('RadioGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const radios = (group = 0) =>
    Array.from(
      fixture.nativeElement.querySelectorAll('lib-radio-group')[group].querySelectorAll('input'),
    ) as HTMLInputElement[];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  it('groups native radios under a legend with separate names per instance', () => {
    expect(fixture.nativeElement.querySelector('legend').textContent).toBe('Plan');
    expect(new Set(radios(0).map((r) => r.name)).size).toBe(1);
    expect(radios(0)[0].name).not.toBe(radios(1)[0].name);
    const description = radios(0)[0].getAttribute('aria-describedby')!;
    expect(document.getElementById(description)?.textContent).toBe('One seat');
    expect(radios(0)[2].disabled).toBeTrue();
  });

  it('reflects and updates the form value', async () => {
    expect(radios()[1].checked).toBeTrue();
    radios()[0].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.plan.value).toBe('solo');

    fixture.componentInstance.plan.setValue('team');
    await fixture.whenStable();
    expect(radios()[1].checked).toBeTrue();
  });

  it('disables the whole group from the form', async () => {
    fixture.componentInstance.plan.disable();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
  });
});
