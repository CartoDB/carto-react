import { Typography } from '@material-ui/core';
import React from 'react';
import Legend, { LegendRow } from '../../legend/Legend';

const options = {
  title: 'Components/Legend',
  component: LegendRow,
  argTypes: {
    title: {
      defaultValue: 'Legend title',
      control: {
        type: 'text'
      }
    },
    hasVisibility: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    visibility: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    expandable: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return (
    <LegendRow {...args}>
      <Typography>Your Content</Typography>
    </LegendRow>
  );
};

const LegendTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer Example',
      visibility: true
    }
  ];
  return <Legend layers={layers}></Legend>;
};

const LegendMultiTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Multi Layer Example',
      visibility: true
    },
    {
      id: 1,
      title: 'Multi Layer Example',
      visibility: false
    }
  ];
  return <Legend layers={layers}></Legend>;
};

export const Playground = Template.bind({});
Playground.args = {};

export const SingleLayer = LegendTemplate.bind({});
export const MultiLayer = LegendMultiTemplate.bind({});
