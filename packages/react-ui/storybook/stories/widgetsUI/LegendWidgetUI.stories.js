import { Typography } from '@material-ui/core';
import React from 'react';
import LegendWidgetUI from '../../../src/widgets/legend/LegendWidgetUI';

const options = {
  title: 'Widgets UI/LegendWidgetUI',
  component: LegendWidgetUI,
  argTypes: {
    title: {
      defaultValue: 'Legend title',
      control: {
        type: 'text'
      }
    },
    switchable: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    visible: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    collapsible: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    note: {
      default: '',
      control: {
        type: 'text'
      }
    },
    attr: {
      default: '',
      control: {
        type: 'text'
      }
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return (
    <LegendWidgetUI {...args}>
      <Typography>Your Content</Typography>
    </LegendWidgetUI>
  );
};

const LegendTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      children: <Typography>Your Content</Typography>
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

const LegendNotFoundTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

const LegendMultiTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Multi Layer',
      visible: true,
      children: <Typography>Your Content</Typography>
    },
    {
      id: 1,
      title: 'Multi Layer',
      visible: false,
      collapsible: false,
      children: <Typography>Your Content</Typography>
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

const LegendCategoriesTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Category Layer',
      visible: true,
      type: 'category',
      note: 'lorem',
      colors: ['#000', '#00F', '#0F0'],
      labels: ['Category 1', 'Category 2', 'Category 3']
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

const LegendIconTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Icon Layer',
      visible: true,
      type: 'icon',
      labels: ['Icon 1', 'Icon 2', 'Icon 3'],
      icons: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1'
      ]
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

const LegendRampTemplate = () => {
  const layersDiscontinuous = [
    {
      id: 0,
      title: 'Ramp Layer',
      visible: true,
      type: 'bins',
      colors: ['#000', '#00F', '#0F0', '#F00'],
      labels: [100, 200, 300]
    }
  ];

  const layersContinuous = [
    {
      id: 0,
      title: 'Ramp Layer',
      visible: true,
      type: 'continuous_ramp',
      colors: ['#000', '#00F', '#0F0', '#F00'],
      labels: [100, 200, 300]
    }
  ];

  return (
    <>
      <LegendWidgetUI legends={layersDiscontinuous}></LegendWidgetUI>
      <LegendWidgetUI legends={layersContinuous}></LegendWidgetUI>
    </>
  );
};

const LegendProportionTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Proportion Layer',
      visible: true,
      type: 'proportion',
      labels: [100, 500]
      // avg: 450
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

const LegendCustomTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      children: <Typography>Legend custom</Typography>
    }
  ];
  return <LegendWidgetUI legends={layers}></LegendWidgetUI>;
};

export const Playground = Template.bind({});

export const SingleLayer = LegendTemplate.bind({});
export const MultiLayer = LegendMultiTemplate.bind({});
export const NotFound = LegendNotFoundTemplate.bind({});
export const Categories = LegendCategoriesTemplate.bind({});
export const Icon = LegendIconTemplate.bind({});
export const Ramp = LegendRampTemplate.bind({});
export const Proportion = LegendProportionTemplate.bind({});
export const Custom = LegendCustomTemplate.bind({});
