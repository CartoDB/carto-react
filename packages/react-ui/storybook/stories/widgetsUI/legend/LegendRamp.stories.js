import React from 'react';
import LegendRamp from '../../../../src/widgets/legend/LegendRamp';

const STATS_LEGEND = {
  legend: {
    stats: {
      min: 0,
      max: 200
    },
    colors: 'TealGrn'
  }
};

const LABELS_LEGEND = {
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
const DefaultProps = { ...STATS_LEGEND };
Default.args = DefaultProps;

export const Continuous = Template.bind({});
const ContinuousProps = { ...STATS_LEGEND, isContinuous: true };
Continuous.args = ContinuousProps;

export const UsingLabels = Template.bind({});
const UsingLabelsProps = { ...LABELS_LEGEND };
UsingLabels.args = UsingLabelsProps;

export const UsingLabelsContinuous = Template.bind({});
const UsingLabelsContinuousProps = { ...LABELS_LEGEND, isContinuous: true };
UsingLabelsContinuous.args = UsingLabelsContinuousProps;
