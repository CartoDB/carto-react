import React from 'react';
import LegendProportion from '../../../../src/widgets/legend/LegendProportion';

const DEFAULT_LEGEND = {
  legend: {
    labels: [0, 200]
  }
};

const options = {
  title: 'Custom Components/Legends/LegendProportion',
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

// Temporary removed
// PR -> https://github.com/CartoDB/carto-react/pull/481
// Shortcut -> https://app.shortcut.com/cartoteam/story/263063/add-widgets-stories-to-storybook
// export default options;

const Template = (args) => {
  return <LegendProportion {...args} />;
};

/* export const Default = Template.bind({});
const DefaultProps = { ...DEFAULT_LEGEND };
Default.args = DefaultProps; */
