import { FeatureCollection, Geometry } from 'geojson';
import { Viewport, TileFeaturesResponse } from '../types';

type GeojsonFeaturesArgs = {
  geojson: FeatureCollection,
  viewport: Viewport,
  geometry?: Geometry
  uniqueIdProperty?: string
}

export function geojsonFeatures(arg: GeojsonFeaturesArgs): TileFeaturesResponse;