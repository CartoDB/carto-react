import { TILE_FORMATS } from '@deck.gl/carto/typed';
import { Polygon, MultiPolygon } from 'geojson';
import { TileFeaturesResponse } from '../types';

export default function tileFeaturesGeometries(arg: {
  tiles: any;
  tileFormat: typeof TILE_FORMATS;
  geometryToIntersect: Polygon | MultiPolygon;
  uniqueIdProperty?: string;
}): TileFeaturesResponse;
