import { AggregationTypes } from './constants/AggregationTypes';
import { HistogramFeature } from '../types';

export function histogram(args: {
  data: Record<string, unknown>[];
  valuesColumns?: string[];
  joinOperation?: AggregationTypes;
  ticks?: number[];
  bins?: number;
  operation?: AggregationTypes;
}): HistogramFeature;
