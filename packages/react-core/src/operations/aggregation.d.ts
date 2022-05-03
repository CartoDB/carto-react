import { AggregationFunctions } from '../types';
import { AggregationTypes } from './constants/AggregationTypes';

export const aggregationFunctions: AggregationFunctions;

export function aggregate(
  feature: Record<string, unknown>,
  keys?: string[],
  joinOperation?: AggregationTypes
);
