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
  onSelectedBarsChange: (evt) => console.log(evt),
  selectedBars: [],
  xAxisData,
  yAxisFormatter: (value) => value + ' $'
};
Simple.args = SimpleProps;
Simple.parameters = buildReactPropsAsString(SimpleProps, 'BarWidgetUI');

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  data,
  xAxisData,
  xAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: (params) => params[0].value + ' $'
};
xAxisFormatter.args = xAxisFormatterProps;
xAxisFormatter.parameters = buildReactPropsAsString(xAxisFormatterProps, 'BarWidgetUI');

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  name: 'STORE',
  data,
  xAxisData,
  yAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: (params) => params[0].value + ' $'
};
yAxisFormatter.args = yAxisFormatterProps;
yAxisFormatter.parameters = buildReactPropsAsString(yAxisFormatterProps, 'BarWidgetUI');

export const Filtered = Template.bind({});
const FilteredProps = {
  data,
  xAxisData,
  selectedBars: [[0, 0]],
  tooltipFormatter: (params) => params[0].value + ' $',
  onSelectedBarsChange: (evt) => {}
};
Filtered.args = FilteredProps;
Filtered.parameters = buildReactPropsAsString(FilteredProps, 'BarWidgetUI');
