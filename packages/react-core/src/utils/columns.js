import { SpatialIndex } from '../operations/constants/SpatialIndexTypes';

export function getColumnNameFromGeoColumn(geoColumn) {
  const parts = geoColumn.split(':');
  return parts.length === 1 ? parts[0] : parts.length === 2 ? parts[1] : null;
}

export function getSpatialIndexFromGeoColumn(geoColumn) {
  const parts = geoColumn.split(':');
  return (parts.length === 1 || parts.length === 2) &&
    Object.values(SpatialIndex).includes(parts[0])
    ? parts[0]
    : null;
}
