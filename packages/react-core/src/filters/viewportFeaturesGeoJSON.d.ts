import * as GeoJSON from 'geojson';
import { Viewport, ViewportFeaturesResponse } from '../types';

type ViewportFeaturesGeoJSONArgs = {
  geojson: GeoJSON.FeatureCollection,
  viewport: Viewport,
  uniqueIdProperty?: string
}

export function viewportFeaturesGeoJSON(arg: ViewportFeaturesGeoJSONArgs): ViewportFeaturesResponse;