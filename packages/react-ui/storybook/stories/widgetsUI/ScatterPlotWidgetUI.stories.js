import React from 'react';
import ScatterPlotWidgetUI from '../../../src/widgets/ScatterPlotWidgetUI';

const options = {
  title: 'Widgets UI/ScatterPlotWidgetUI',
  component: ScatterPlotWidgetUI
};

export default options;

const dataDefault = [
  [1000.0, 800.04],
  [800.07, 600.95]
];

const Template = (args) => <ScatterPlotWidgetUI {...args} />;

export const Default = Template.bind({});
const DefaultProps = { data: dataDefault, name: 'name' };
Default.args = DefaultProps;

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  name: 'xFormatter',
  data: dataDefault,
  xAxisFormatter: (v) => `${v / 1000}k`
};
xAxisFormatter.args = xAxisFormatterProps;

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  name: 'yFormatter',
  data: dataDefault,
  yAxisFormatter: (v) => ({ prefix: `$`, value: v })
};
yAxisFormatter.args = yAxisFormatterProps;

export const tooltipFormatter = Template.bind({});
const tooltipFormatterProps = {
  name: 'tooltipFormatter',
  data: dataDefault,
  tooltipFormatter: (v) => `Price $ ${v.value[1]} Sales: ${v.value[0]}`
};

tooltipFormatter.args = tooltipFormatterProps;