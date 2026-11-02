import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { PopoverComponent } from './popover/popover.component';
import { SliderComponent } from './slider/slider.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BreadcrumbComponent,
    DrawerComponent,
    MultiSelectComponent,
    PopoverComponent,
    SliderComponent,
  ],
  template: `
    <lib-breadcrumb
      [items]="[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/p' },
        { label: 'Atlas' },
      ]"
    />
    <lib-slider label="Volume" unit="%" [formControl]="volume" />
    <lib-multi-select label="Teams" [options]="teams" [formControl]="selected" />
    <lib-popover label="Filters"><button id="inside" type="button">Apply</button></lib-popover>
    <button id="opener" type="button" (click)="drawer = true">Open</button>
    <lib-drawer title="Settings" position="start" [(open)]="drawer">Body</lib-drawer>
  `,
})
class HostComponent {
  volume = new FormControl<number | null>(30);
  selected = new FormControl<(string | number)[] | null>([]);
  drawer = false;
  teams = [
    { value: 'design', label: 'Design' },
    { value: 'eng', label: 'Engineering' },
    { value: 'ops', label: 'Operations' },
    { value: 'sales', label: 'Sales' },
  ];
}

describe('Navigation, overlay and input components', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const q = <T extends Element>(selector: string) =>
    fixture.nativeElement.querySelector(selector) as T;
  const qa = <T extends Element>(selector: string) =>
    Array.from(fixture.nativeElement.querySelectorAll(selector)) as T[];
  const nextTask = () => new Promise((resolve) => setTimeout(resolve, 20));

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  });

  afterEach(() => fixture.nativeElement.remove());

  it('renders a labelled breadcrumb with the current page', () => {
    expect(q('lib-breadcrumb nav').getAttribute('aria-label')).toBe('Breadcrumb');
    expect(qa('lib-breadcrumb a').length).toBe(2);
    const current = q('lib-breadcrumb [aria-current="page"]');
    expect(current.textContent?.trim()).toBe('Atlas');
    expect(current.tagName).toBe('SPAN');
  });

  it('binds the slider to forms and announces the unit', async () => {
    const input = q<HTMLInputElement>('lib-slider input');
    expect(input.value).toBe('30');
    expect(input.getAttribute('aria-valuetext')).toBe('30%');
    expect(q('lib-slider label').textContent).toContain('Volume');
    input.value = '55';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(host.volume.value).toBe(55);
    host.volume.setValue(80);
    await fixture.whenStable();
    expect(input.value).toBe('80');
  });

  it('opens the multi-select, filters and toggles options from the keyboard', async () => {
    const trigger = q<HTMLButtonElement>('lib-multi-select .lib-multi-select-trigger');
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    expect(q('lib-multi-select [role="listbox"]').getAttribute('aria-multiselectable')).toBe(
      'true',
    );
    trigger.click();
    await nextTask();
    await fixture.whenStable();
    const filter = q<HTMLInputElement>('lib-multi-select input');
    expect(document.activeElement).toBe(filter);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const key = (k: string) =>
      filter.dispatchEvent(new KeyboardEvent('keydown', { key: k, cancelable: true }));
    key('Enter');
    key('ArrowDown');
    key('ArrowDown');
    key('Enter');
    await fixture.whenStable();
    expect(host.selected.value).toEqual(['design', 'ops']);
    expect(q('lib-multi-select [aria-selected="true"]').textContent).toContain('Design');

    filter.value = 'sal';
    filter.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(qa('lib-multi-select [role="option"]').length).toBe(1);
    expect(filter.getAttribute('aria-activedescendant')).toBe(
      q('lib-multi-select [role="option"]').id,
    );
    key('Enter');
    await fixture.whenStable();
    expect(host.selected.value).toEqual(['design', 'ops', 'sales']);
    expect(trigger.textContent).toContain('3 selected');

    key('Escape');
    await fixture.whenStable();
    expect(document.activeElement).toBe(trigger);
    expect(trigger.getAttribute('aria-label')).toBe('Teams: 3 selected');
  });

  it('clears the multi-select and keeps focus in the panel', async () => {
    host.selected.setValue(['eng']);
    await fixture.whenStable();
    q<HTMLButtonElement>('lib-multi-select .lib-multi-select-trigger').click();
    await nextTask();
    q<HTMLButtonElement>('lib-multi-select footer button').click();
    await fixture.whenStable();
    expect(host.selected.value).toEqual([]);
    expect(document.activeElement).toBe(q('lib-multi-select input'));
  });

  it('opens the popover, focuses its content and returns focus on Escape', async () => {
    const trigger = q<HTMLButtonElement>('lib-popover button');
    trigger.click();
    await nextTask();
    await fixture.whenStable();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(q('#inside'));
    expect(q('lib-popover [role="dialog"]').getAttribute('aria-label')).toBe('Filters');
    q('#inside').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTask();
    await fixture.whenStable();
    expect(document.activeElement).toBe(trigger);
  });

  it('opens the drawer as a modal side panel', async () => {
    const opener = q<HTMLButtonElement>('#opener');
    opener.focus();
    opener.click();
    await fixture.whenStable();
    const dialog = q<HTMLDialogElement>('lib-drawer dialog');
    expect(dialog.matches(':modal')).toBeTrue();
    expect(q('lib-drawer').getAttribute('data-position')).toBe('start');
    expect(q('lib-drawer .lib-dialog-close').getAttribute('aria-label')).toBe('Close panel');
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    await fixture.whenStable();
    expect(host.drawer).toBeFalse();
    expect(document.activeElement).toBe(opener);
  });
});
