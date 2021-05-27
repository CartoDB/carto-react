import { FeatureCollection } from 'geojson';
import { Viewport, ViewportFeaturesResponse } from '../types';

type ViewportFeaturesGeoJSONArgs = {
  geojson: FeatureCollection,
  viewport: Viewport,
  uniqueIdProperty?: string
}

export function viewportFeaturesGeoJSON(arg: ViewportFeaturesGeoJSONArgs): ViewportFeaturesResponse;