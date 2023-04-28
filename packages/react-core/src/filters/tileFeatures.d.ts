import { TileFeatures, TileFeaturesResponse } from '../types';
import { Feature, Polygon, MultiPolygon } from 'geojson';

export function getGeometryToIntersect(viewport: number[] | null, spatialFilter: Feature<Polygon | MultiPolygon> | null): Polygon | MultiPolygon | null;
export function tileFeatures(arg: TileFeatures): TileFeaturesResponse;