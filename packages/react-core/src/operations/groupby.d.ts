import { AggregationTypes } from './constants/AggregationTypes';
import { GroupByFeature } from '../types';

export function groupValuesByColumn(
  data: [],
  valuesColumn: string,
  keysColumn: string,
  operation: AggregationTypes
): GroupByFeature;
