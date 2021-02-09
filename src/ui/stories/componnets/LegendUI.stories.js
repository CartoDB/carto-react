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
      title: 'Single Layer',
      visibility: true
    }
  ];
  return <Legend layers={layers}></Legend>;
};

const LegendMultiTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Multi Layer',
      visibility: true
    },
    {
      id: 1,
      title: 'Multi Layer',
      visibility: false
    }
  ];
  return <Legend layers={layers}></Legend>;
};

const LegendCategoriesTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Category Layer',
      visibility: true,
      type: 'category',
      data: [
        {
          color: '#000',
          label: 'Small'
        },
        {
          color: '#FF00FF',
          label: 'Medium'
        }
      ]
    }
  ];
  return <Legend layers={layers}></Legend>;
};

const LegendIconTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Icon Layer',
      visibility: true,
      type: 'icon',
      data: [
        {
          icon:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
          label: 'Small'
        },
        {
          icon:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
          label: 'Medium'
        }
      ]
    }
  ];
  return <Legend layers={layers}></Legend>;
};

export const Playground = Template.bind({});
Playground.args = {};

export const SingleLayer = LegendTemplate.bind({});
export const MultiLayer = LegendMultiTemplate.bind({});
export const Categories = LegendCategoriesTemplate.bind({});
export const Icon = LegendIconTemplate.bind({});
