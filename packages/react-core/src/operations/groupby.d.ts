import { AggregationTypes } from './aggregation/AggregationTypes';
import { GroupByFeature } from '../types'

export function groupValuesByColumn(
  data: [], // TODO: geojson types
  valuesColumn: string,
  keysColumn: string,
  operation: AggregationTypes
): GroupByFeature;