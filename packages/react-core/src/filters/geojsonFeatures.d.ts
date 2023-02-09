import { FeatureCollection, Geometry } from 'geojson';
import { Viewport, TileFeaturesResponse, ResultFormat } from '../types';

type GeojsonFeaturesArgs = {
  geojson: FeatureCollection,
  viewport: Viewport,
  geometry?: Geometry
  uniqueIdProperty?: string
  resultFormat?: ResultFormat
}

export function geojsonFeatures(arg: GeojsonFeaturesArgs): TileFeaturesResponse;