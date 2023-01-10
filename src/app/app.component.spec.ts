import { TestBed } from '@angular/core/testing';
import { NgxIntlHelperComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxIntlHelperComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NgxIntlHelperComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngx-intl-helper'`, () => {
    const fixture = TestBed.createComponent(NgxIntlHelperComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ngx-intl-helper');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NgxIntlHelperComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome ngx-intl-helper'
    );
  });
});
