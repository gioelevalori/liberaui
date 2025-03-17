import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSiteComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonSiteComponent;
  let fixture: ComponentFixture<ButtonSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSiteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
