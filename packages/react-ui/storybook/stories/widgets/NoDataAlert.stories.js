import React from 'react';
import NoDataAlert from '../../../../react-widgets/src/widgets/NoDataAlert';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets/NoDataAlert',
  component: NoDataAlert,
  argTypes: {
    title: {
      control: { type: 'text' }
    },
    body: {
      control: { type: 'text' }
    }
  }
};

export default options;

const Template = (args) => <NoDataAlert {...args} />;

export const Empty = Template.bind({});
Empty.args = {};
Empty.parameters = buildReactPropsAsString({}, 'NoDataAlert');

export const CustomTexts = Template.bind({});
const CustomTextsProps = {
  titlee: 'Example',
  body: "Hey, I've modified the NoDataAlert component"
};
CustomTexts.args = CustomTextsProps;
CustomTexts.parameters = buildReactPropsAsString(CustomTextsProps, 'NoDataAlert');
