import { GroupByFeature } from '../types';
import { GroupDateTypes } from './constants/GroupDateTypes';
import { AggregationTypes } from './constants/AggregationTypes';

export function groupValuesByDateColumn(args: {
  data: Record<string, unknown>[];
  valuesColumns?: string[];
  joinOperation?: AggregationTypes;
  keysColumn?: string;
  groupType?: GroupDateTypes;
  operation?: AggregationTypes;
}): GroupByFeature;
