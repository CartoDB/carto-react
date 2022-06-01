import { TILE_FORMATS } from '@deck.gl/carto';
import { AggregationTypes } from './operations/constants/AggregationTypes';
import { Geometry } from 'geojson';
import { SpatialIndex } from './operations/constants/SpatialIndexTypes';

export type AggregationFunctions = Record<
  AggregationTypes,
  (
    values: Record<string, unknown>[],
    keys?: string | string[],
    joinOperation?: AggregationTypes
  ) => {}
>;

export type GroupByFeature =
  | {
      name: string;
      value: number;
    }[]
  | [];

export type HistogramFeature = { min?: number; max?: number; data?: number[]; ticks?: number[] };

export type ScatterPlotFeature = [number, number][];

export type Viewport = [number, number, number, number];

export type TileFeatures = {
  tiles: any; // TODO: add proper deck.gl type
  viewport: Viewport;
  geometry?: Geometry;
  uniqueIdProperty?: string;
  tileFormat: TILE_FORMATS;
  spatialIndex?: SpatialIndex
};

export type TileFeaturesResponse = Record<string, unknown>[] | [];
