import { GroupByFeature } from '../types';
import { GroupDateTypes } from './constants/GroupDateTypes';

export function groupValuesByDateColumn(
  data: [],
  valuesColumn: string,
  keysColumn: string,
  operation: GroupDateTypes
): GroupByFeature;
