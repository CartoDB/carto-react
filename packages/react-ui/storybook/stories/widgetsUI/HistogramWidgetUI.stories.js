import React from 'react';
import HistogramWidgetUI from '../../../src/widgets/HistogramWidgetUI';

const options = {
  title: 'Widgets UI/HistogramWidgetUI',
  component: HistogramWidgetUI
};

export default options;

const Template = (args) => <HistogramWidgetUI {...args} />;

const data = [100, 300, 500, 250, 50, 200, 100];

const dataAxis = [100, 200, 300, 400, 500, 600];

export const Empty = Template.bind({});
const EmptyProps = {
  name: 'STORE',
  data,
  dataAxis,
  selectedBars: [],
  tooltipFormatter: () => {}
};
Empty.args = EmptyProps;

export const Simple = Template.bind({});
const SimpleProps = {
  name: 'STORE',
  data,
  onSelectedBarsChange: (evt) => console.log(evt),
  selectedBars: [],
  dataAxis,
  tooltipFormatter: (params) => params[0].value + ' $'
};
Simple.args = SimpleProps;

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  name: 'STORE',
  data,
  dataAxis,
  xAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: (params) => params[0].value + ' $'
};
xAxisFormatter.args = xAxisFormatterProps;

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  name: 'STORE',
  data,
  dataAxis,
  yAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: (params) => params[0].value + ' $'
};
yAxisFormatter.args = yAxisFormatterProps;

export const Filtered = Template.bind({});
const FilteredProps = {
  name: 'STORE',
  data,
  dataAxis,
  selectedBars: [1, 2],
  tooltipFormatter: (params) => params[0].value + ' $',
  onSelectedBarsChange: (evt) => {}
};
Filtered.args = FilteredProps;
