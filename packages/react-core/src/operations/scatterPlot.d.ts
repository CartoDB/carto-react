import { AggregationTypes } from './constants/AggregationTypes';
import { ScatterPlotFeature } from '../types';

export function scatterPlot(args: {
  data: Record<string, unknown>[];
  xAxisColumns: string[];
  xAxisJoinOperation?: AggregationTypes;
  yAxisColumns: string[];
  yAxisJoinOperation?: AggregationTypes;
}): ScatterPlotFeature;
