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

const data = [...Array(10)].map((_, idx) => {
  return (idx + 10) * 50;
});

// TODO
export const Default = Template.bind({});
const DefaultProps = { values: data, min: 0, max: 1000, limits: [500, 950] };
Default.args = DefaultProps;
