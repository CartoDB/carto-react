import { TILE_FORMATS } from '@deck.gl/carto';
import { AggregationTypes } from './operations/aggregation/AggregationTypes';
import { Geometry } from 'geojson';
export declare type AggregationFunctions = {
    [AggregationTypes.COUNT]: Function;
    [AggregationTypes.MIN]: Function;
    [AggregationTypes.MAX]: Function;
    [AggregationTypes.SUM]: Function;
    [AggregationTypes.AVG]: Function;
};
export declare type GroupByFeature = {
    name: string;
    value: number;
}[] | [];
export declare type HistogramFeature = number[] | [];
export declare type Viewport = [number, number, number, number];
export declare type TileFeatures = {
    tiles: any;
    viewport: Viewport;
    geometry?: Geometry;
    uniqueIdProperty?: string;
    tileFormat: TILE_FORMATS;
};
export declare type TileFeaturesResponse = Record<string, unknown>[] | [];
