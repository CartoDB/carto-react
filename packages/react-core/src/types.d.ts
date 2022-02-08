import { TILE_FORMATS } from '@deck.gl/carto'
import { AggregationTypes } from './operations/aggregation/AggregationTypes';
import { Geometry } from 'geojson';
import {
  FilterTypes
} from './filters/FilterQueryBuilder';

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

export type TileFeatures = {
  tiles: any, // TODO: add proper deck.gl type
  viewport: Viewport,
  geometry?: Geometry,
  uniqueIdProperty?: string,
  tileFormat: TILE_FORMATS
}

export type TileFeaturesResponse = Record<string, unknown>[] | []

export type _FilterTypes = typeof FilterTypes;
