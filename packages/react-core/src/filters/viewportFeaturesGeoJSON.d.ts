import { FeatureCollection, Geometry } from 'geojson';
import { Viewport, ViewportFeaturesResponse } from '../types';

type ViewportFeaturesGeoJSONArgs = {
  geojson: FeatureCollection,
  spatialFilterGeometry?: Geometry,
  viewport: Viewport,
  uniqueIdProperty?: string
}

export function viewportFeaturesGeoJSON(arg: ViewportFeaturesGeoJSONArgs): ViewportFeaturesResponse;