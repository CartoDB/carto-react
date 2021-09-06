import { GroupByFeature } from '../types'
import { GroupDateTypes } from './GroupDateTypes';

export function groupValuesByDateColumn(
  data: [], // TODO: geojson types
  valuesColumn: string,
  keysColumn: string,
  operation: GroupDateTypes
): GroupByFeature;