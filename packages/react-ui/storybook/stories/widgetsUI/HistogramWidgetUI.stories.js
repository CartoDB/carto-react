import React from 'react';
import HistogramWidgetUI from '../../../src/widgets/HistogramWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/HistogramWidgetUI',
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
Empty.parameters = buildReactPropsAsString(EmptyProps, 'HistogramWidgetUI');

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
Simple.parameters = buildReactPropsAsString(SimpleProps, 'HistogramWidgetUI');

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  name: 'STORE',
  data,
  dataAxis,
  xAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: (params) => params[0].value + ' $'
};
xAxisFormatter.args = xAxisFormatterProps;
xAxisFormatter.parameters = buildReactPropsAsString(
  xAxisFormatterProps,
  'HistogramWidgetUI'
);

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  name: 'STORE',
  data,
  dataAxis,
  yAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: (params) => params[0].value + ' $'
};
yAxisFormatter.args = yAxisFormatterProps;
yAxisFormatter.parameters = buildReactPropsAsString(
  yAxisFormatterProps,
  'HistogramWidgetUI'
);

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
Filtered.parameters = buildReactPropsAsString(FilteredProps, 'HistogramWidgetUI');
