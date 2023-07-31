import React, { useState } from 'react';
import LegendWidgetUI from '../../../src/widgets/legend/LegendWidgetUI';

const options = {
  title: 'Widgets/LegendWidgetUI',
  component: LegendWidgetUI,
  argTypes: {
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
  },
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return (
    <LegendWidgetUI {...args}>
      <div>Your Content</div>
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
        children: <div>Your Content</div>
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

const LegendWithOpacityTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      showOpacityControl: true,
      opacity: 0.5,
      legend: {
        children: <div>Your Content</div>
      }
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
        children: <div>Your Content</div>
      }
    },
    {
      id: 1,
      title: 'Multi Layer',
      visible: false,
      collapsible: false,
      legend: {
        children: <div>Your Content</div>
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
        children: <div>Your Content</div>
      }
    },
    {
      id: 1,
      title: 'Multi Layer',
      visible: false,
      collapsible: false,
      legend: {
        children: <div>Your Content</div>
      }
    }
  ];

  return (
    <LegendWidgetUI
      layers={layers}
      collapsed={collapsed}
      onChangeCollapsed={({ collapsed }) => setCollapsed(collapsed)}
    />
  );
};

const categoryLegend = {
  type: 'category',
  note: 'lorem',
  colors: ['#000', '#00F', '#0F0'],
  labels: ['Category 1', 'Category 2', 'Category 3']
};

const LegendCategoriesTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Category Layer',
      visible: true,
      legend: categoryLegend
    }
  ];
  return <LegendWidgetUI layers={layers}></LegendWidgetUI>;
};

const LegendCategoriesStrokeTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Category Layer as stroke',
      visible: true,
      legend: {
        ...categoryLegend,
        isStrokeColor: true
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
          '/static/media/storybook/assets/carto-symbol.svg',
          '/static/media/storybook/assets/carto-symbol.svg',
          '/static/media/storybook/assets/carto-symbol.svg'
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
        children: <div>Legend custom</div>
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
export const LegendWithOpacityControl = LegendWithOpacityTemplate.bind({});
export const Categories = LegendCategoriesTemplate.bind({});
export const CategoriesAsStroke = LegendCategoriesStrokeTemplate.bind({});
export const Icon = LegendIconTemplate.bind({});
export const Ramp = LegendRampTemplate.bind({});
export const Proportion = LegendProportionTemplate.bind({});
export const Custom = LegendCustomTemplate.bind({});
export const NoChildren = LegendNoChildrenTemplate.bind({});
