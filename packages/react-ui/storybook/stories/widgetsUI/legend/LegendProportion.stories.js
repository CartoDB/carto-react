import React from 'react';
import LegendProportion from '../../../../src/widgets/new-legend/legend-types/LegendProportion';
import { IntlProvider } from 'react-intl';

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
  return (
    <IntlProvider locale='en'>
      <LegendProportion {...args} />
    </IntlProvider>
  );
};

export const Default = Template.bind({});
const DefaultProps = { ...DEFAULT_LEGEND };
Default.args = DefaultProps;
