import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSiteComponent } from './table-site.component';

describe('TableSiteComponent', () => {
  let component: TableSiteComponent;
  let fixture: ComponentFixture<TableSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSiteComponent], providers: [provideNoopAnimations(), provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
