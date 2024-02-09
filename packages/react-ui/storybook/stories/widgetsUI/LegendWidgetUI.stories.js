import { useReducer, useState } from 'react';
import LegendWidgetUI from '../../../src/widgets/legend/LegendWidgetUI';
import { IntlProvider } from 'react-intl';
import { Box } from '@mui/material';
import { fixtures } from './legendFixtures';

const options = {
  title: 'Widgets/LegendWidgetUI',
  component: LegendWidgetUI,
  argTypes: {
    collapsed: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    layers: {
      defaultValue: fixtures,
      control: {
        type: 'array'
      }
    },
    position: {
      defaultValue: 'top-left',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      control: {
        type: 'radio'
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

/**
 * @param {Parameters<LegendWidgetUI>[0] & { height: number }} args
 */
const Widget = ({ height, ...props }) => (
  <IntlProvider locale='en'>
    <Box sx={{ height, position: 'relative' }}>
      <LegendWidgetUI {...props} />
    </Box>
  </IntlProvider>
);

function useLegendState(args) {
  const [collapsed, setCollapsed] = useState(args.collapsed);
  const [layers, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.layer];
      case 'remove':
        return state.filter((layer) => layer.id !== action.layer.id);
      case 'update':
        return state.map((layer) => {
          if (layer.id === action.layer.id) {
            return { ...layer, ...action.layer };
          }
          return layer;
        });
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }, args.layers);

  return { collapsed, setCollapsed, layers, dispatch };
}

/**
 * @param {Parameters<LegendWidgetUI>[0]} args
 */
const Template = ({ ...args }) => {
  const { collapsed, setCollapsed, layers, dispatch } = useLegendState(args);

  return (
    <Widget
      {...args}
      height={400}
      layers={layers}
      collapsed={collapsed}
      onChangeCollapsed={setCollapsed}
      onChangeLegendRowCollapsed={(layer) => dispatch({ type: 'update', layer })}
      onChangeOpacity={(layer) => dispatch({ type: 'update', layer })}
      onChangeVisibility={(layer) => dispatch({ type: 'update', layer })}
      currentZoom={13}
    />
  );
};
export const Playground = Template.bind({});

const LegendTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      legend: {
        type: 'category',
        labels: ['Category 1', 'Category 2', 'Category 3'],
        colors: ['#000', '#00F', '#0F0']
      }
    }
  ];
  return <Template layers={layers} />;
};

const LegendNotFoundTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true
    }
  ];
  return <Template layers={layers} />;
};

const LegendWithoutOpacityTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      showOpacityControl: false,
      opacity: 0.5,
      legend: {
        type: 'category',
        labels: ['Category 1'],
        colors: ['#faa']
      }
    }
  ];
  return <Template layers={layers} />;
};

const LegendMultiTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Layer 1',
      visible: true,
      legend: {
        type: 'category',
        labels: ['Category 1'],
        colors: ['#faa']
      }
    },
    {
      id: 1,
      title: 'Layer 2',
      visible: false,
      collapsible: false,
      legend: {
        type: 'category',
        labels: ['Category 2'],
        colors: ['#faf']
      }
    }
  ];
  return <Template layers={layers} />;
};

const LegendMultiTemplateCollapsed = () => {
  const [collapsed, setCollapsed] = useState(true);

  const layers = [
    {
      id: 0,
      title: 'Layer 1',
      visible: true,
      legend: {
        type: 'category',
        labels: ['Category 1'],
        colors: ['#faa']
      }
    },
    {
      id: 1,
      title: 'Layer 2',
      visible: false,
      collapsible: false,
      legend: {
        type: 'category',
        labels: ['Category 2'],
        colors: ['#faf']
      }
    }
  ];

  return (
    <Template
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
  return <Template layers={layers} />;
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
  return <Template layers={layers} />;
};

const ICON = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9InFsbTY3aXI1MWEiPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlR3JhcGhpYyIgdmFsdWVzPSIwIDAgMCAwIDAuMTcyNTQ5IDAgMCAwIDAgMC4xODgyMzUgMCAwIDAgMCAwLjE5NjA3OCAwIDAgMCAxLjAwMDAwMCAwIi8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8ZyBmaWx0ZXI9InVybCgjcWxtNjdpcjUxYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNDIgLTQ2NCkgdHJhbnNsYXRlKDIyMiA0NDgpIj4KICAgICAgICAgICAgICAgIDxnIGZpbGw9IiMyQzMwMzIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDE2KSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyIDBjNi42MjcgMCAxMiA1LjM3MyAxMiAxMnMtNS4zNzMgMTItMTIgMTJTMCAxOC42MjcgMCAxMiA1LjM3MyAwIDEyIDB6IiBvcGFjaXR5PSIuMiIvPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==`;
const LegendIconTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Icon Layer',
      visible: true,
      legend: {
        type: 'icon',
        labels: ['Icon 1', 'Icon 2', 'Icon 3'],
        icons: [ICON, ICON, ICON]
      }
    }
  ];
  return <Template layers={layers} />;
};

const LegendRampTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Ramp Discontinuous',
      visible: true,
      legend: {
        type: 'bins',
        colors: ['#000', '#00F', '#0F0', '#F00'],
        labels: [100, 200, 300],
        showMinMax: true
      }
    },
    {
      id: 1,
      title: 'Ramp Continuous',
      visible: true,
      legend: {
        type: 'continuous_ramp',
        colors: ['#000', '#00F', '#0F0', '#F00'],
        labels: [100, 200, 300]
      }
    }
  ];

  return <Template collapsed={false} layers={layers} />;
};

const LegendProportionTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Proportion Layer',
      visible: true,
      legend: {
        type: 'proportion',
        labels: [100, 500],
        showMinMax: true
      }
    }
  ];
  return <Template layers={layers} />;
};

const LegendCustomTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true,
      legend: {
        type: 'custom'
      }
    }
  ];
  const customLegendTypes = {
    custom: () => <div>Custom Legend</div>
  };
  return <Template layers={layers} customLegendTypes={customLegendTypes} />;
};

const LegendNoChildrenTemplate = () => {
  const layers = [
    {
      id: 0,
      title: 'Single Layer',
      visible: true
    }
  ];
  return <Template layers={layers} />;
};

export const SingleLayer = LegendTemplate.bind({});
export const MultiLayer = LegendMultiTemplate.bind({});
export const MultiLayerCollapsed = LegendMultiTemplateCollapsed.bind({});
export const NotFound = LegendNotFoundTemplate.bind({});
export const LegendWithoutOpacityControl = LegendWithoutOpacityTemplate.bind({});
export const Categories = LegendCategoriesTemplate.bind({});
export const CategoriesAsStroke = LegendCategoriesStrokeTemplate.bind({});
export const Icon = LegendIconTemplate.bind({});
export const Ramp = LegendRampTemplate.bind({});
export const Proportion = LegendProportionTemplate.bind({});
export const Custom = LegendCustomTemplate.bind({});
export const NoChildren = LegendNoChildrenTemplate.bind({});
