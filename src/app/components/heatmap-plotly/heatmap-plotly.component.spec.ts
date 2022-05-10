import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapPlotlyComponent } from './heatmap-plotly.component';

describe('HeatmapPlotlyComponent', () => {
  let component: HeatmapPlotlyComponent;
  let fixture: ComponentFixture<HeatmapPlotlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatmapPlotlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapPlotlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
