import { NoDataAlert } from '@carto/react-ui';
import React from 'react';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Organisms/NoDataAlert',
  component: NoDataAlert,
  argTypes: {
    title: {
      table: {
        type: {
          summary: 'string'
        }
      },
      control: { type: 'text' }
    },
    body: {
      table: {
        type: {
          summary: 'string'
        }
      },
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
