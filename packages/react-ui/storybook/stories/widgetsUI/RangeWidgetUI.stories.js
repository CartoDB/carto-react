import React from 'react';
import RangeWidgetUI from '../../../src/widgets/RangeWidgetUI';

const options = {
  title: 'Custom Components/RangeWidgetUI',
  component: RangeWidgetUI,
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
  return <RangeWidgetUI {...args} />;
};

// TODO
export const Default = Template.bind({});
const DefaultProps = { data: [400, 500], min: 0, max: 1000, limits: [300, 950] };
Default.args = DefaultProps;
