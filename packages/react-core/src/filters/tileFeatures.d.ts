import { TileFeatures, TileFeaturesResponse } from '../types';
import { Feature, Polygon, MultiPolygon } from 'geojson';

export function getGeometryToIntersect(viewport: number[] | null, geometry: Feature<Polygon | MultiPolygon> | null): Feature<Polygon | MultiPolygon> | null;
export function tileFeatures(arg: TileFeatures): TileFeaturesResponse;