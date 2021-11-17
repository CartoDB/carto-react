import React from 'react';
import BarWidgetUI from '../../../src/widgets/BarWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/BarWidgetUI',
  component: BarWidgetUI
};

export default options;

const Template = (args) => {
  if (args.yAxisData && !Array.isArray(args.yAxisData)) {
    args.yAxisData = [];
  }

  return <BarWidgetUI {...args} />;
};

const data = [100, 300, 500, 250, 50, 200, 100];

const xAxisData = [100, 200, 300, 400, 500, 600];

export const Empty = Template.bind({});
const EmptyProps = {
  data,
  xAxisData,
  selectedBars: []
};
Empty.args = EmptyProps;
Empty.parameters = buildReactPropsAsString(EmptyProps, 'BarWidgetUI');

export const Simple = Template.bind({});
const SimpleProps = {
  data,
  xAxisData
};
Simple.args = SimpleProps;
Simple.parameters = buildReactPropsAsString(SimpleProps, 'BarWidgetUI');

export const Horizontal = Template.bind({});
const HorizontalProps = {
  data,
  xAxisData,
  vertical: false
};
Horizontal.args = HorizontalProps;
Horizontal.parameters = buildReactPropsAsString(HorizontalProps, 'BarWidgetUI');

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  data,
  xAxisData,
  xAxisFormatter: (v) => `${v / 1000}k $`
};
xAxisFormatter.args = xAxisFormatterProps;
xAxisFormatter.parameters = buildReactPropsAsString(xAxisFormatterProps, 'BarWidgetUI');

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  data,
  xAxisData,
  yAxisFormatter: (v) => `${v / 1000}k $`
};
yAxisFormatter.args = yAxisFormatterProps;
yAxisFormatter.parameters = buildReactPropsAsString(yAxisFormatterProps, 'BarWidgetUI');

export const Filtered = Template.bind({});
const FilteredProps = {
  data,
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
const multipleXAxisData = [100, 200, 300, 400, 500, 600];
export const Multiple = Template.bind({});
const MultipleProps = {
  data: multipleData,
  xAxisData: multipleXAxisData
};
Multiple.args = MultipleProps;
Multiple.parameters = buildReactPropsAsString(MultipleProps, 'BarWidgetUI');

export const MultipleHorizontal = Template.bind({});
const MultipleHorizontalProps = {
  data: multipleData,
  xAxisData: multipleXAxisData,
  vertical: false
};
MultipleHorizontal.args = MultipleHorizontalProps;
MultipleHorizontal.parameters = buildReactPropsAsString(
  MultipleHorizontalProps,
  'BarWidgetUI'
);

const multipleYAxisData = ['First', 'Second'];
export const MultipleWithYAxisData = Template.bind({});
const MultipleWithYAxisDataProps = {
  data: multipleData,
  xAxisData: multipleXAxisData,
  yAxisData: multipleYAxisData
};
MultipleWithYAxisData.args = MultipleWithYAxisDataProps;
MultipleWithYAxisData.parameters = buildReactPropsAsString(
  MultipleWithYAxisDataProps,
  'BarWidgetUI'
);

const dirtyMultipleYAxisData = ['pop_m', 'pop_f'];
const labels = { pop_m: 'Población hombre', pop_f: 'Población mujer' };
export const MultipleWithYAxisDataAndLabels = Template.bind({});
const MultipleWithYAxisDataAndLabelsProps = {
  data: multipleData,
  xAxisData: multipleXAxisData,
  yAxisData: dirtyMultipleYAxisData,
  labels
};
MultipleWithYAxisDataAndLabels.args = MultipleWithYAxisDataAndLabelsProps;
MultipleWithYAxisDataAndLabels.parameters = buildReactPropsAsString(
  MultipleWithYAxisDataAndLabelsProps,
  'BarWidgetUI'
);

export const MultipleBars = Template.bind({});
const MultipleBarsProps = {
  data: multipleData,
  xAxisData: multipleXAxisData,
  yAxisData: multipleYAxisData,
  stacked: false
};
MultipleBars.args = MultipleBarsProps;
MultipleBars.parameters = buildReactPropsAsString(MultipleBarsProps, 'BarWidgetUI');

export const MultipleBarsHorizontal = Template.bind({});
const MultipleBarsHorizontalProps = {
  data: multipleData,
  xAxisData: multipleXAxisData,
  yAxisData: multipleYAxisData,
  stacked: false,
  vertical: false
};
MultipleBarsHorizontal.args = MultipleBarsHorizontalProps;
MultipleBarsHorizontal.parameters = buildReactPropsAsString(
  MultipleBarsHorizontalProps,
  'BarWidgetUI'
);
