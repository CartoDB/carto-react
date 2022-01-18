import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LegendWidgetUI from '../../../src/widgets/legend/LegendWidgetUI';

const options = {
  title: 'Widgets UI/LegendWidgetUI',
  component: LegendWidgetUI,
  argTypes: {
    className: {
      control: {
        type: 'text'
      }
    },
    layers: {
      defaultValue: [],
      control: {
        type: 'array'
      }
    },
    collapsed: {
      defaultValue: false,
      control: {
        type: 'boolean'
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
      legend: {
        children: <Typography>Your Content</Typography>
      }
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendNotFoundTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendMultiTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Multi Layer',
      visible: true,
      legend: {
        children: <Typography>Your Content</Typography>
      }
    },
    {
      id: 1,
      title: 'Multi Layer',
      visible: false,
      collapsible: false,
      legend: {
        children: <Typography>Your Content</Typography>
      }
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendMultiTemplateCollapsed = () => {
  const [collapsed, setCollapsed] = useState(true);
  
  const layers = [
    {
      id: 0,
      title: 'Multi Layer',
      visible: true,
      legend: {
        children: <Typography>Your Content</Typography>
      }
    },
    {
      id: 1,
      title: 'Multi Layer',
      visible: false,
      collapsible: false,
      legend: {
        children: <Typography>Your Content</Typography>
      }
    }
  ];

  return <LegendWidgetUI layers={layers} collapsed={collapsed} onCollapsedChange={setCollapsed} />;
};

const LegendCategoriesTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Category Layer',
      visible: true,
      legend: {
        type: 'category',
        note: 'lorem',
        colors: ['#000', '#00F', '#0F0'],
        labels: ['Category 1', 'Category 2', 'Category 3']
      }
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendIconTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Icon Layer',
      visible: true,
      legend: {
        type: 'icon',
        labels: ['Icon 1', 'Icon 2', 'Icon 3'],
        icons: [
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1'
        ]
      }
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendRampTemplate = () => {
  const layersDiscontinuous = [
    {
      id: 0,
      title: 'Ramp Layer',
      visible: true,
      legend: {
        type: 'bins',
        colors: ['#000', '#00F', '#0F0', '#F00'],
        labels: [100, 200, 300]
      }
    }
  ];

  const layersContinuous = [
    {
      id: 0,
      title: 'Ramp Layer',
      visible: true,
      legend: {
        type: 'continuous_ramp',
        colors: ['#000', '#00F', '#0F0', '#F00'],
        labels: [100, 200, 300]
      }
    }
  ];

  return (
    <>
      <LegendWidgetUI layers={layersDiscontinuous}></LegendWidgetUI>
      <LegendWidgetUI layers={layersContinuous}></LegendWidgetUI>
    </>
  );
};

const LegendProportionTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Proportion Layer',
      visible: true,
      legend: {
        type: 'proportion',
        labels: [100, 500]
        // avg: 450
      }
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendCustomTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      legend: {
        children: <Typography>Legend custom</Typography>
      }
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendNoChildrenTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      legend: {}
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

export const Playground = Template.bind({});

export const SingleLayer = LegendTemplate.bind({});
export const MultiLayer = LegendMultiTemplate.bind({});
export const MultiLayerCollapsed = LegendMultiTemplateCollapsed.bind({});
export const NotFound = LegendNotFoundTemplate.bind({});
export const Categories = LegendCategoriesTemplate.bind({});
export const Icon = LegendIconTemplate.bind({});
export const Ramp = LegendRampTemplate.bind({});
export const Proportion = LegendProportionTemplate.bind({});
export const Custom = LegendCustomTemplate.bind({});
export const NoChildren = LegendNoChildrenTemplate.bind({});
