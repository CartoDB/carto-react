import { FeatureCollection, Geometry } from 'geojson';
import { Viewport, ViewportFeaturesResponse } from '../types';

type ViewportFeaturesGeoJSONArgs = {
  geojson: FeatureCollection,
  viewport: Viewport,
  spatialFilter?: Geometry
  uniqueIdProperty?: string
}

export function viewportFeaturesGeoJSON(arg: ViewportFeaturesGeoJSONArgs): ViewportFeaturesResponse;