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
import * as cartoSlice from '../../../../react-redux/src/slices/cartoSlice';
import { AggregationTypes } from '../../../../react-core/src';
import HistogramWidget from '../../../../react-widgets/src/widgets/HistogramWidget';
import { mockAppStoreConfiguration } from './utils';

const store = mockAppStoreConfiguration();
store.dispatch(
  cartoSlice.setWidgetLoadingState({ widgetId: 'sb-histogram-id', isLoading: false })
);

const mockedData = [...Array(40)].map((_, idx) => ({
  'sb-column': idx < 10 ? 100 : idx < 25 ? 200 : idx < 33 ? 300 : idx < 35 ? 400 : 500
}));
store.dispatch(
  cartoSlice.setViewportFeatures({ sourceId: 'sb-data-source', features: mockedData })
);

const options = {
  title: 'Widgets/HistogramWidget',
  component: HistogramWidget,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    operation: {
      control: {
        type: 'select',
        options: Object.values(AggregationTypes)
      }
    }
  },
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

export default options;

const Template = (args) => <HistogramWidget {...args} />;

const DEFAULT_PROPS = {
  id: 'sb-histogram-id',
  title: 'wrapper title',
  dataSource: 'sb-data-source',
  column: 'sb-column',
  ticks: [200, 300, 400, 500],
  operation: 'count'
};

export const Default = Template.bind({});
Default.args = DEFAULT_PROPS;

export const xAxisFormatter = Template.bind({});
xAxisFormatter.args = { ...DEFAULT_PROPS, xAxisFormatter: (v) => `${v}$` };

export const yAxisFormatter = Template.bind({});
yAxisFormatter.args = { ...DEFAULT_PROPS, formatter: (v) => `$${v}` };
