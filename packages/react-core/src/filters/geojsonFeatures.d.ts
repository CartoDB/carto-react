import { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { TileFeaturesResponse } from '../types';

type GeojsonFeaturesArgs = {
  geojson: FeatureCollection,
  geometryToIntersect: Polygon | MultiPolygon | null,
  uniqueIdProperty?: string
}

export function geojsonFeatures(arg: GeojsonFeaturesArgs): TileFeaturesResponse;