import React from 'react';
import CategoryWidgetUI from '../../../src/widgets/CategoryWidgetUI/CategoryWidgetUI';
import { IntlProvider } from 'react-intl';

const options = {
  title: 'Widgets/CategoryWidgetUI',
  component: CategoryWidgetUI
};

export default options;

const Widget = (props) => (
  <IntlProvider locale='en'>
    <CategoryWidgetUI {...props} />
  </IntlProvider>
);

const Template = (args) => {
  return <Widget {...args} />;
};

const data = [...Array(200000)].map((_, idx) => ({
  name: `Category ${idx + 1}`,
  value: idx * 100
}));

export const Default = Template.bind({});
Default.args = { data };
Default.parameters = {
  controls: {
    exclude: ['data']
  }
};
