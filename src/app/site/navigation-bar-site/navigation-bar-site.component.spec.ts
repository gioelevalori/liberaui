import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarSiteComponent } from './navigation-bar-site.component';

describe('NavigationBarSiteComponent', () => {
  let component: NavigationBarSiteComponent;
  let fixture: ComponentFixture<NavigationBarSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarSiteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigationBarSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
