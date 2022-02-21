import { AggregationTypes } from './constants/AggregationTypes';
import { HistogramFeature } from '../types';

export function histogram(
  features: [],
  columnName: string,
  ticks: number[],
  operation: AggregationTypes
): HistogramFeature;
