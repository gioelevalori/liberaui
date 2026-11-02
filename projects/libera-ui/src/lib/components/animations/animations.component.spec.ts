import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AnimationsComponent } from './animations.component';

describe('AnimationsComponent', () => {
  let component: AnimationsComponent;
  let fixture: ComponentFixture<AnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('AnimationsComponent without zone.js', () => {
  it('renders the entered state without a manual change detection pass', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationsComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimationsComponent);
    fixture.componentRef.setInput('animation', 'fadeInOut');
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 20));
    await fixture.whenStable();

    const wrapper: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(wrapper.className).toBe('fadeInOut-in');
  });
});
