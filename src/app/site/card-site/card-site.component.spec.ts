import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSiteComponent } from './card-site.component';

describe('CardSiteComponent', () => {
  let component: CardSiteComponent;
  let fixture: ComponentFixture<CardSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSiteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
