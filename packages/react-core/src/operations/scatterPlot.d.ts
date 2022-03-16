import { AggregationTypes } from './constants/AggregationTypes';
import { ScatterPlotFeature } from '../types';

export function scatterPlot(args: {
  data: Record<string, unknown>[];
  xAxisColumns: string[];
  yAxisColumns: string[];
  joinOperation?: AggregationTypes;
}): ScatterPlotFeature;
