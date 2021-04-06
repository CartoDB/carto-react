import { AggregationTypes } from './operations/aggregation/AggregationTypes';

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