import React, { useState } from 'react';
import HistogramWidgetUI from '../../../src/widgets/HistogramWidgetUI/HistogramWidgetUI';

const options = {
  title: 'Custom Components/HistogramWidgetUI',
  component: HistogramWidgetUI,
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

export default options;

const Template = (args) => {
  return <HistogramWidgetUI {...args} />;
};

const defaultProps = {
  data: [100, 300, 500, 250, 50, 200, 100],
  ticks: [100, 200, 300, 400, 500, 600],
  min: 0,
  max: 700
};

export const Empty = Template.bind({});
const EmptyProps = {
  ...defaultProps
};
Empty.args = EmptyProps;

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  ...defaultProps,
  xAxisFormatter: (v) => `${v / 1000}k`
};
xAxisFormatter.args = xAxisFormatterProps;

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  ...defaultProps,
  yAxisFormatter: (v) => `${v / 1000}k`
};
yAxisFormatter.args = yAxisFormatterProps;

export const Filtered = Template.bind({});
const FilteredProps = {
  ...defaultProps,
  selectedBars: [1, 2],
  tooltipFormatter: (params) => params[0].value + ' $'
};
Filtered.args = FilteredProps;


export const NonEqualSizeBins = Template.bind({});
const NonEqualSizeBinsProps = {
  ...defaultProps,
  ticks: [100, 200, 250, 450, 500, 600],
};
NonEqualSizeBins.args = NonEqualSizeBinsProps;
