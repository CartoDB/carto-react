import React from 'react';
import LegendRamp from '../../../../src/widgets/legend/LegendRamp';

const DEFAULT_LEGEND = {
  legend: {
    labels: [0, 200],
    colors: 'TealGrn'
  }
};

const options = {
  title: 'Custom Components/Legends/LegendRamp',
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

export const Default = Template.bind({});
const DefaultProps = { ...DEFAULT_LEGEND };
Default.args = DefaultProps;

export const Continuous = Template.bind({});
const ContinuousProps = { ...DEFAULT_LEGEND, isContinuous: true };
Continuous.args = ContinuousProps;
