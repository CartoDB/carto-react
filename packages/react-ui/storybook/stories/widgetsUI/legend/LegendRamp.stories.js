import React from 'react';
import LegendRamp from '../../../../src/widgets/legend/LegendRamp';

const DEFAULT_LEGEND = {
  legend: {
    labels: [0, 200],
    colors: 'TealGrn'
  }
};

const DEFAULT_LEGEND_WITH_FORMATTED_LABELS = {
  legend: {
    labels: [
      { value: 0, label: '0 km' },
      { value: 100, label: '100 km' },
      { value: 200, label: '200 km' }
    ],
    colors: 'TealGrn'
  }
};

const options = {
  title: 'Widgets/Legends/LegendRamp',
  component: LegendRamp,
  argTypes: {
    legend: {}
  },
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
  return <LegendRamp {...args} />;
};

export const Discontinuous = Template.bind({});
Discontinuous.args = { ...DEFAULT_LEGEND };

export const DiscontinuousWithFormattedLabels = Template.bind({});
DiscontinuousWithFormattedLabels.args = { ...DEFAULT_LEGEND_WITH_FORMATTED_LABELS };

export const Continuous = Template.bind({});
Continuous.args = { ...DEFAULT_LEGEND, isContinuous: true };

export const ContinuousWithFormattedLabels = Template.bind({});
ContinuousWithFormattedLabels.args = {
  ...DEFAULT_LEGEND_WITH_FORMATTED_LABELS,
  isContinuous: true
};
