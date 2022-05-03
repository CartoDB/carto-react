import { AggregationTypes } from './constants/AggregationTypes';
import { GroupByFeature } from '../types';

export function groupValuesByColumn(args: {
  data: Record<string, unknown>[];
  valuesColumns?: string[];
  joinOperation?: AggregationTypes;
  keysColumn?: string;
  operation?: AggregationTypes;
}): GroupByFeature;
