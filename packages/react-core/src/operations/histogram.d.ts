import { AggregationTypes } from './aggregation/AggregationTypes';
import { HistogramFeature } from '../types';

export function histogram(
  features: [],
  columnName: string,
  ticks: number[],
  operation: AggregationTypes
): HistogramFeature;
