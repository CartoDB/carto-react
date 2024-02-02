import React, { useReducer } from 'react';
import LegendWidgetUI from '../../../src/widgets/new-legend/LegendWidgetUI';
import { IntlProvider } from 'react-intl';
import { Box } from '@mui/material';
import { fixtures } from './legendFixtures';

const options = {
  title: 'Widgets/NewLegendWidgetUI',
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
    layerOrder: {
      defaultValue: [],
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
  const [collapsed, setCollapsed] = React.useState(args.collapsed);
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
    />
  );
};
export const Playground = Template.bind({});
