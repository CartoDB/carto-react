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

// Temporary removed
// PR -> https://github.com/CartoDB/carto-react/pull/481
// Shortcut -> https://app.shortcut.com/cartoteam/story/263063/add-widgets-stories-to-storybook
// export default options;

const Template = (args) => {
  return <RangeWidgetUI {...args} />;
};

/* export const Default = Template.bind({});
// TODO
const DefaultProps = { data: [400, 500], min: 0, max: 1000, limits: [300, 950] };
Default.args = DefaultProps; */
