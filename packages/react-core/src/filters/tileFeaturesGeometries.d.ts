import { Polygon, MultiPolygon } from 'geojson';
import { TileFeaturesResponse } from '../types';
import { TILE_FORMATS } from '../types';

export default function tileFeaturesGeometries(arg: {
  tiles: any;
  tileFormat: typeof TILE_FORMATS;
  geometryToIntersect: Polygon | MultiPolygon;
  uniqueIdProperty?: string;
  options?: { storeGeometry: boolean };
}): TileFeaturesResponse;

export const GEOM_STORED_VALUE: string;