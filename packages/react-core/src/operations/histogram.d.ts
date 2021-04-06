import { AggregationTypes } from './aggregation/AggregationTypes';
import { HistogramFeature } from '../types'

export function histogram(
  features: [], // TODO: geojson types
  columnName: string,
  ticks: number[],
  operation: AggregationTypes
): HistogramFeature;