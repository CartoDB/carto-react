import { AggregationTypes } from './operations/aggregation/AggregationTypes';
import { Geometry } from 'geojson';

export type AggregationFunctions = {
  [AggregationTypes.COUNT]: Function,
  [AggregationTypes.MIN]: Function,
  [AggregationTypes.MAX]: Function,
  [AggregationTypes.SUM]: Function,
  [AggregationTypes.AVG]: Function
}

export type GroupByFeature = {
  name: string,
  value: number
}[] | [];

export type HistogramFeature = number[] | [];

export type Viewport = [number, number, number, number];

export type ViewportFeaturesBinary = {
  tiles: any, // TODO: add proper deck.gl type
  viewport: Viewport,
  spatialFilter?: Geometry,
  uniqueIdProperty?: string
}

export type ViewportFeaturesResponse = Record<string, unknown>[] | []
