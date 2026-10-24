import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ComponentsComponent } from './components.component';

describe('ComponentsComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({imports:[ComponentsComponent], providers:[provideRouter([]),{provide:ActivatedRoute,useValue:{queryParamMap:of(convertToParamMap({q:'switch'}))}}]}));
  it('combines a shared search query with category filters', () => {
    const fixture = TestBed.createComponent(ComponentsComponent); fixture.detectChanges();
    expect(fixture.componentInstance.filtered.length).toBe(2);
    fixture.componentInstance.category = 'Forms'; fixture.detectChanges();
    expect(fixture.componentInstance.filtered.map(item => item.path)).toEqual(['/switch']);
    fixture.componentInstance.query = 'nothing like this'; fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.catalog-empty').textContent).toContain('No components found');
  });
});
