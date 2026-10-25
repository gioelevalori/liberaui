import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });
  it('creates a local workspace preview and updates a checklist', async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#workspace-name');
    input.value = 'My studio';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.workspace-demo form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.workspace-demo [role=status]').textContent,
    ).toContain('My studio is ready');
    const tasks: HTMLInputElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.task-list input'),
    );
    tasks[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.completed).toBe(3);
  });
  it('limits examples to the selected category', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    fixture.componentInstance.filter = 'Workspace';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.workspace-demo')).toBeNull();
    expect(fixture.nativeElement.querySelector('.team-demo')).not.toBeNull();
  });
});
