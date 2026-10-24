import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextareaSiteComponent } from './input-textarea-site.component';

describe('InputTextareaSiteComponent', () => {
  let component: InputTextareaSiteComponent;
  let fixture: ComponentFixture<InputTextareaSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextareaSiteComponent], providers: [provideNoopAnimations(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputTextareaSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
