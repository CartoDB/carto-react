import { GroupByFeature } from '../types';
import { GroupDateTypes } from './GroupDateTypes';

export function groupValuesByDateColumn(
  data: [],
  valuesColumn: string,
  keysColumn: string,
  operation: GroupDateTypes
): GroupByFeature;
