import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextareaSiteComponent } from './input-textarea-site.component';

describe('InputTextareaSiteComponent', () => {
  let component: InputTextareaSiteComponent;
  let fixture: ComponentFixture<InputTextareaSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextareaSiteComponent]
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
