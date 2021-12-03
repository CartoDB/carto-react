import React from 'react';
import BarWidgetUI from '../../../src/widgets/BarWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/BarWidgetUI',
  component: BarWidgetUI
};

export default options;

const Template = (args) => {
  if (args.series && !Array.isArray(args.series)) {
    args.series = [];
  }

  return <BarWidgetUI {...args} />;
};

const yAxisData = [100, 300, 500, 250, 50, 200];

const xAxisData = yAxisData.map((_, idx) => `Store ${idx + 1}`);

export const Empty = Template.bind({});
const EmptyProps = {
  yAxisData,
  xAxisData,
  selectedBars: [],
  series: ['Visitors']
};
Empty.args = EmptyProps;
Empty.parameters = buildReactPropsAsString(EmptyProps, 'BarWidgetUI');

export const Simple = Template.bind({});
const SimpleProps = {
  yAxisData,
  xAxisData
};
Simple.args = SimpleProps;
Simple.parameters = buildReactPropsAsString(SimpleProps, 'BarWidgetUI');

export const SimpleWithSerieName = Template.bind({});
const SimpleWithSerieNameProps = {
  yAxisData,
  xAxisData,
  series: ['Visitors']
};
SimpleWithSerieName.args = SimpleWithSerieNameProps;
SimpleWithSerieName.parameters = buildReactPropsAsString(
  SimpleWithSerieNameProps,
  'BarWidgetUI'
);

export const Horizontal = Template.bind({});
const HorizontalProps = {
  yAxisData,
  xAxisData,
  vertical: false
};
Horizontal.args = HorizontalProps;
Horizontal.parameters = buildReactPropsAsString(HorizontalProps, 'BarWidgetUI');

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  yAxisData,
  xAxisData,
  yAxisFormatter: (v) => `${v / 1000}k $`
};
yAxisFormatter.args = yAxisFormatterProps;
yAxisFormatter.parameters = buildReactPropsAsString(yAxisFormatterProps, 'BarWidgetUI');

export const Filtered = Template.bind({});
const FilteredProps = {
  yAxisData,
  xAxisData,
  selectedBars: [0],
  onSelectedBarsChange: (evt) => {}
};
Filtered.args = FilteredProps;
Filtered.parameters = buildReactPropsAsString(FilteredProps, 'BarWidgetUI');

// Multiple bars
const multipleData = [
  [100, 300, 500, 250, 50, 200, 100],
  [100, 300, 500, 250, 50, 200, 100]
];
export const Multiple = Template.bind({});
const MultipleProps = {
  yAxisData: multipleData,
  xAxisData
};
Multiple.args = MultipleProps;
Multiple.parameters = buildReactPropsAsString(MultipleProps, 'BarWidgetUI');

export const MultipleHorizontal = Template.bind({});
const MultipleHorizontalProps = {
  yAxisData: multipleData,
  xAxisData,
  vertical: false
};
MultipleHorizontal.args = MultipleHorizontalProps;
MultipleHorizontal.parameters = buildReactPropsAsString(
  MultipleHorizontalProps,
  'BarWidgetUI'
);

const multipleSeries = ['First', 'Second'];
export const MultipleWithYAxisData = Template.bind({});
const MultipleWithYAxisDataProps = {
  yAxisData: multipleData,
  xAxisData,
  series: multipleSeries
};
MultipleWithYAxisData.args = MultipleWithYAxisDataProps;
MultipleWithYAxisData.parameters = buildReactPropsAsString(
  MultipleWithYAxisDataProps,
  'BarWidgetUI'
);

const dirtySeries = ['pop_m', 'pop_f'];
const labels = { pop_m: 'Población hombre', pop_f: 'Población mujer' };
export const MultipleWithYAxisDataAndLabels = Template.bind({});
const MultipleWithYAxisDataAndLabelsProps = {
  yAxisData: multipleData,
  xAxisData,
  series: dirtySeries,
  labels
};
MultipleWithYAxisDataAndLabels.args = MultipleWithYAxisDataAndLabelsProps;
MultipleWithYAxisDataAndLabels.parameters = buildReactPropsAsString(
  MultipleWithYAxisDataAndLabelsProps,
  'BarWidgetUI'
);

export const MultipleBars = Template.bind({});
const MultipleBarsProps = {
  yAxisData: multipleData,
  xAxisData,
  series: multipleSeries,
  stacked: false
};
MultipleBars.args = MultipleBarsProps;
MultipleBars.parameters = buildReactPropsAsString(MultipleBarsProps, 'BarWidgetUI');

export const MultipleBarsHorizontal = Template.bind({});
const MultipleBarsHorizontalProps = {
  yAxisData: multipleData,
  xAxisData,
  series: multipleSeries,
  stacked: false,
  vertical: false
};
MultipleBarsHorizontal.args = MultipleBarsHorizontalProps;
MultipleBarsHorizontal.parameters = buildReactPropsAsString(
  MultipleBarsHorizontalProps,
  'BarWidgetUI'
);
