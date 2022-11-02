import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext, CloudCircle, Home, Style } from '@mui/icons-material';
import Typography from '../../../src/atoms/Typography';

const options = {
  title: 'Common/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    maxItems: {
      control: {
        type: 'number'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A26153'
    },
    status: {
      type: 'needUpdate'
    }
  }
};
export default options;

const Template = ({ ...args }) => (
  <Breadcrumbs
    aria-label='breadcrumb'
    separator={<NavigateNext fontSize='small' />}
    {...args}
  >
    <Link color='inherit' href='#'>
      CARTO
    </Link>
    <Link color='inherit' href='#'>
      React
    </Link>
    <Typography color='textPrimary'>Storybook</Typography>
  </Breadcrumbs>
);

const WithIconsTemplate = ({ ...args }) => (
  <Breadcrumbs
    aria-label='breadcrumb'
    separator={<NavigateNext fontSize='small' />}
    {...args}
  >
    <Link color='inherit' href='#'>
      <Home />
      CARTO
    </Link>
    <Link color='inherit' href='#'>
      <CloudCircle />
      React
    </Link>
    <Typography color='textPrimary'>
      <Style />
      Storybook
    </Typography>
  </Breadcrumbs>
);

export const Playground = Template.bind({});

export const TextOnly = Template.bind({});
TextOnly.args = {};

export const Collapsed = Template.bind({});
Collapsed.args = { maxItems: 2 };

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {};

export const WithIconsCollapsed = WithIconsTemplate.bind({});
WithIconsCollapsed.args = { maxItems: 2 };
