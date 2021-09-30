import React from 'react';
import { Provider } from 'react-redux';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY
} from '@storybook/addon-docs/blocks';
import * as cartoSlice from '@carto/react-redux/src/slices/cartoSlice';
import ScatterPlotWidget from '../../../../react-widgets/src/widgets/ScatterPlotWidget';
import { mockAppStoreConfiguration } from './utils';
import { buildReactPropsAsString } from '../../utils';

const store = mockAppStoreConfiguration();

store.dispatch(
  cartoSlice.setViewportFeatures({
    sourceId: 'sb-data-source',
    features: [
      { 'sb-x-column': 5000, 'sb-y-column': 3000 },
      { 'sb-x-column': 2000, 'sb-y-column': 1000 }
    ]
  })
);

const options = {
  title: 'Widgets/ScatterPlotWidget',
  component: ScatterPlotWidget,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      )
    }
  }
};

// export default options;

const Template = (args) => <ScatterPlotWidget {...args} />;

const DEFAULT_PROPS = {
  id: 'sb-scatter-id',
  title: 'wrapper title',
  dataSource: 'sb-data-source',
  xAxisColumn: 'sb-x-column',
  yAxisColumn: 'sb-y-column'
};

export const Default = Template.bind({});
Default.args = DEFAULT_PROPS;
Default.parameters = buildReactPropsAsString(DEFAULT_PROPS, 'ScatterPlotWidget');

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = { ...DEFAULT_PROPS, xAxisFormatter: (v) => `${v}$` };
xAxisFormatter.args = xAxisFormatterProps;
xAxisFormatter.parameters = buildReactPropsAsString(
  xAxisFormatterProps,
  'ScatterPlotWidget'
);

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = { ...DEFAULT_PROPS, yAxisFormatter: (v) => `$${v}` };
yAxisFormatter.args = yAxisFormatterProps;
yAxisFormatter.parameters = buildReactPropsAsString(
  yAxisFormatterProps,
  'ScatterPlotWidget'
);

export const tooltipFormatter = Template.bind({});
const tooltipFormatterProps = {
  ...DEFAULT_PROPS,
  tooltipFormatter: (v) => `Price: $ ${v.value[0]}`
};
tooltipFormatter.args = tooltipFormatterProps;
tooltipFormatter.parameters = buildReactPropsAsString(
  tooltipFormatterProps,
  'ScatterPlotWidget'
);
