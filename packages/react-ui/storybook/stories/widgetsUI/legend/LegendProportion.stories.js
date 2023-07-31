import React from 'react';
import LegendProportion from '../../../../src/widgets/legend/LegendProportion';

const DEFAULT_LEGEND = {
  legend: {
    labels: [0, 200]
  }
};

const options = {
  title: 'Widgets/Legends/LegendProportion',
  component: LegendProportion,
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
  return <LegendProportion {...args} />;
};

export const Default = Template.bind({});
const DefaultProps = { ...DEFAULT_LEGEND };
Default.args = DefaultProps;
