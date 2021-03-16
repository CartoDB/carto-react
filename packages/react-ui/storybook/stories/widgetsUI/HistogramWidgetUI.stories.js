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
Empty.args = {
  name: 'STORE',
  data,
  dataAxis,
  selectedBars: [],
  tooltipFormatter: () => {}
};

export const Simple = Template.bind({});
Simple.args = {
  name: 'STORE',
  data,
  onSelectedBarsChange: (evt) => console.log(evt),
  selectedBars: [],
  dataAxis,
  tooltipFormatter: ([{ value }]) => value + ' $'
};

export const xAxisFormatter = Template.bind({});
xAxisFormatter.args = {
  name: 'STORE',
  data,
  dataAxis,
  xAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: ([{ value }]) => value + ' $'
};

export const yAxisFormatter = Template.bind({});
yAxisFormatter.args = {
  name: 'STORE',
  data,
  dataAxis,
  yAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: ([{ value }]) => value + ' $'
};

export const Filtered = Template.bind({});
Filtered.args = {
  name: 'STORE',
  data,
  dataAxis,
  selectedBars: [1, 2],
  tooltipFormatter: ([{ value }]) => value + ' $',
  onSelectedBarsChange: (evt) => {
    // Do nothing
  }
};
