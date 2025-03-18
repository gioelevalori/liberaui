import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPasswordSiteComponent } from './input-password-site.component';

describe('InputPasswordSiteComponent', () => {
  let component: InputPasswordSiteComponent;
  let fixture: ComponentFixture<InputPasswordSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordSiteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputPasswordSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
