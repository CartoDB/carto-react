import { TileFeatures, TileFeaturesResponse } from '../types';
import { Geometry, Feature, Polygon, MultiPolygon } from 'geojson';

export function getGeometryToIntersect(viewport: number[], geometry: Geometry | null): Feature<Polygon | MultiPolygon> | null;
export function tileFeatures(arg: TileFeatures): TileFeaturesResponse;