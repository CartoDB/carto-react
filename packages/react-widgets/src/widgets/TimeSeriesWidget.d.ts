import { AggregationTypes, GroupDateTypes } from '@carto/react-core';
import { CommonWidgetProps, MonoColumnWidgetProps } from '../types';

export interface TimeseriesWidgetSerie {
  operation: AggregationTypes;
  operationColumn?: string;
};

export type TimeSeriesWidgetProps = {
  operationColumn?: string;
  series?: TimeseriesWidgetSerie[];

  stepSize: GroupDateTypes;
  stepMultiplier?: number;
  stepSizeOptions?: string[];

  splitByCategory?: string;
  splitByCategoryLimit?: number;
  splitByCategoryValues?: string[];

  chartType?: string;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  formatter?: Function;

  height?: string;
  fitHeihgt?: boolean;
  stableHeight?: boolean;
  showControls?: boolean;
  showLegend?: boolean;

  isPlaying?: boolean;
  isPaused?: boolean;
  timeWindow?: number[];

  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onTimelineUpdate?: (position: number) => void;
  onTimeWindowUpdate?: (timeWindow: [number, number]) => void;
} & CommonWidgetProps &
  MonoColumnWidgetProps;

declare const TimeSeriesWidget: (props: TimeSeriesWidgetProps) => JSX.Element;
export default TimeSeriesWidget;
