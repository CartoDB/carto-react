import { TILE_FORMATS } from '@deck.gl/carto';
import { Feature, Polygon, MultiPolygon } from 'geojson';
import { ResultFormat, TileFeaturesResponse } from "../types";

export default function tileFeaturesGeometries(arg: {
  tiles: any;
  tileFormat: TILE_FORMATS;
  geometryToIntersect: Feature<Polygon | MultiPolygon>;
  uniqueIdProperty?: string;
  resultFormat?: ResultFormat
}): TileFeaturesResponse;

