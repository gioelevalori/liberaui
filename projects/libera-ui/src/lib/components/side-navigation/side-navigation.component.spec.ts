import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavigationComponent } from './side-navigation.component';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  const query = <T extends HTMLElement>(selector: string): T =>
    fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    document.body.appendChild(fixture.nativeElement);
    fixture.detectChanges();
  });

  afterEach(() => fixture.nativeElement.remove());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('connects the trigger to the panel it opens', () => {
    const trigger = query<HTMLButtonElement>('.nav-trigger');
    expect(trigger.getAttribute('aria-controls')).toBe(query('nav').id);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('moves focus into the panel on open and back to the trigger on Escape', async () => {
    const trigger = query<HTMLButtonElement>('.nav-trigger');
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(query('.closebtn'));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(query('nav').hidden).toBeTrue();
    expect(document.activeElement).toBe(trigger);
  });

  it('returns focus to the trigger when the close button is used', async () => {
    const trigger = query<HTMLButtonElement>('.nav-trigger');
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    query<HTMLButtonElement>('.closebtn').click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.activeElement).toBe(trigger);
  });

  it('ignores Escape while closed so it does not steal focus', () => {
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(outside);
    outside.remove();
  });
});
