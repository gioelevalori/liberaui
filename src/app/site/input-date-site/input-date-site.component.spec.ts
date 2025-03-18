import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDateSiteComponent } from './input-date-site.component';


describe('InputDateSiteComponent', () => {
  let component: InputDateSiteComponent;
  let fixture: ComponentFixture<InputDateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateSiteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputDateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
