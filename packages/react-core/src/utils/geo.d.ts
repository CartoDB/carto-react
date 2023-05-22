import { Viewport } from '../types';
import { Polygon, MultiPolygon } from 'geojson';

export function getGeometryToIntersect(viewport: Viewport | null, geometry: Polygon | MultiPolygon | null): Polygon | MultiPolygon | null;

export function isGlobalViewport(viewport: Viewport | null): boolean;

export function normalizeGeometry(geometry: Polygon | MultiPolygon | null): Polygon | MultiPolygon | null