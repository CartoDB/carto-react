import { TileFeatures, TileFeaturesResponse, Viewport } from '../types';
import { Polygon, MultiPolygon } from 'geojson';

export function getGeometryToIntersect(viewport: number[] | null, geometry: Polygon | MultiPolygon | null): Polygon | MultiPolygon | null;
export function isGlobalViewport(viewport: Viewport | null): boolean;
export function tileFeatures(arg: TileFeatures): TileFeaturesResponse;