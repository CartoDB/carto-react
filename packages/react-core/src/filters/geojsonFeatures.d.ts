import { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { Viewport, TileFeaturesResponse } from '../types';

type GeojsonFeaturesArgs = {
  geojson: FeatureCollection,
  viewport?: Viewport,
  geometry?: Polygon | MultiPolygon,
  uniqueIdProperty?: string
}

export function geojsonFeatures(arg: GeojsonFeaturesArgs): TileFeaturesResponse;