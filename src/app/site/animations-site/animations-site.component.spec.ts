import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimationsSiteComponent } from './animations-site.component';

describe('AnimationsSiteComponent', () => {
  let component: AnimationsSiteComponent;
  let fixture: ComponentFixture<AnimationsSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationsSiteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimationsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
