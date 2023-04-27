import { FeatureCollection, Feature, Polygon, MultiPolygon } from 'geojson';
import { TileFeaturesResponse } from '../types';

type GeojsonFeaturesArgs = {
  geojson: FeatureCollection,
  geometryToIntersect: Feature<Polygon | MultiPolygon> | null,
  uniqueIdProperty?: string
}

export function geojsonFeatures(arg: GeojsonFeaturesArgs): TileFeaturesResponse;