import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ProgressBarComponent, SpinnerComponent } from './progress/progress.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { TagComponent } from './tag/tag.component';

@Component({
  standalone: true,
  imports: [
    AvatarComponent,
    BadgeComponent,
    ProgressBarComponent,
    SpinnerComponent,
    SkeletonComponent,
    TagComponent,
  ],
  template: `
    <lib-badge id="count" [value]="count" label="{{ count }} unread messages" />
    <lib-badge id="dot" dot tone="danger" label="New activity" />
    <lib-tag tone="success" removable removeLabel="Remove Design" (removed)="removed = removed + 1"
      >Design</lib-tag
    >
    <lib-skeleton [lines]="3" />
    <lib-skeleton shape="circle" width="40px" />
    <lib-progress-bar id="known" label="Upload" [value]="progress" showValue visibleLabel />
    <lib-progress-bar id="unknown" label="Syncing" [value]="null" />
    <lib-spinner label="Loading members" />
    <lib-avatar id="named" name="Ada  Lovelace Byron" />
    <lib-avatar id="pic" name="Grace Hopper" [src]="src" />
    <lib-avatar id="decor" name="Linus" decorative />
  `,
})
class HostComponent {
  count = 120;
  removed = 0;
  progress = 42.6;
  src = 'data:image/png;base64,broken';
}

describe('Display components', () => {
  let fixture: ComponentFixture<HostComponent>;
  const q = <T extends Element>(selector: string) =>
    fixture.nativeElement.querySelector(selector) as T;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  it('caps badge counts and labels them', () => {
    const badge = q('#count .lib-badge');
    expect(badge.textContent).toBe('99+');
    expect(badge.getAttribute('aria-label')).toBe('120 unread messages');
    expect(badge.getAttribute('role')).toBe('img');
    expect(q('#dot .lib-badge').textContent).toBe('');
    expect(q('#dot .lib-badge').getAttribute('aria-label')).toBe('New activity');
  });

  it('removes tags through a labelled button', async () => {
    const button = q<HTMLButtonElement>('lib-tag button');
    expect(button.getAttribute('aria-label')).toBe('Remove Design');
    button.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.removed).toBe(1);
  });

  it('hides skeletons from assistive technology and shortens the last line', () => {
    const skeleton = q('lib-skeleton');
    expect(skeleton.getAttribute('aria-hidden')).toBe('true');
    const lines = skeleton.querySelectorAll<HTMLElement>('.lib-skeleton');
    expect(lines.length).toBe(3);
    expect(lines[2].style.width).toBe('60%');
    expect(q('lib-skeleton + lib-skeleton .lib-skeleton').getAttribute('data-shape')).toBe(
      'circle',
    );
  });

  it('exposes determinate and indeterminate progress', () => {
    const known = q('#known [role="progressbar"]');
    expect(known.getAttribute('aria-label')).toBe('Upload');
    expect(known.getAttribute('aria-valuenow')).toBe('43');
    expect(q('#known .lib-progress-label').textContent).toContain('43%');
    const unknown = q('#unknown [role="progressbar"]');
    expect(unknown.hasAttribute('aria-valuenow')).toBeFalse();
    expect(unknown.classList).toContain('indeterminate');
  });

  it('announces the spinner label', () => {
    expect(q('lib-spinner [role="status"]').textContent?.trim()).toBe('Loading members');
  });

  it('falls back to initials and names the avatar', async () => {
    const named = q('#named .lib-avatar');
    expect(named.textContent?.trim()).toBe('AB');
    expect(named.getAttribute('aria-label')).toBe('Ada  Lovelace Byron');
    q('#pic img').dispatchEvent(new Event('error'));
    await fixture.whenStable();
    expect(q('#pic img')).toBeNull();
    expect(q('#pic .lib-avatar').textContent?.trim()).toBe('GH');
    expect(q('#decor .lib-avatar').getAttribute('aria-hidden')).toBe('true');
    expect(q('#decor .lib-avatar').hasAttribute('role')).toBeFalse();
  });
});
