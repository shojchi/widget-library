import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLibrary } from './widget-library';

describe('WidgetLibrary', () => {
  let component: WidgetLibrary;
  let fixture: ComponentFixture<WidgetLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetLibrary]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
