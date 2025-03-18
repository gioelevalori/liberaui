import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCheckboxSiteComponent } from './input-checkbox-site.component';

describe('InputCheckboxSiteComponent', () => {
  let component: InputCheckboxSiteComponent;
  let fixture: ComponentFixture<InputCheckboxSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCheckboxSiteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputCheckboxSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
