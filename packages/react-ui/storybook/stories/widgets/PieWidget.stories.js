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
import PieWidget from '../../../../react-widgets/src/widgets/PieWidget';
import { mockAppStoreConfiguration } from './utils';
import { buildReactPropsAsString } from '../../utils';

const store = mockAppStoreConfiguration();

const mockedData = [...Array(10)].map((_, idx) => ({
  'sb-column': `Category ${
    idx < 2 ? '1' : idx < 4 ? '2' : idx < 8 ? '3' : idx < 9 ? '4' : '5'
  }`,
  'sb-operation-column': idx * 100
}));
store.dispatch(
  cartoSlice.setViewportFeatures({ sourceId: 'sb-data-source', features: mockedData })
);

const options = {
  title: 'Widgets/PieWidget',
  component: PieWidget,
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

// export default options;

const Template = (args) => <PieWidget {...args} />;

const DEFAULT_PROPS = {
  id: 'sb-pie-id',
  title: 'wrapper title',
  dataSource: 'sb-data-source',
  column: 'sb-column',
  operationColumn: 'sb-operation-column',
  operation: 'sum'
};

export const Default = Template.bind({});
Default.args = DEFAULT_PROPS;
Default.parameters = buildReactPropsAsString(DEFAULT_PROPS, 'PieWidget');

export const WithFormatter = Template.bind({});
const WithFormatterProps = { ...DEFAULT_PROPS, formatter: (v) => `$${v}` };
WithFormatter.args = WithFormatterProps;
WithFormatter.parameters = buildReactPropsAsString(WithFormatterProps, 'PieWidget');

export const TooltipFormatter = Template.bind({});
const TooltipFormatterProps = {
  ...DEFAULT_PROPS,
  tooltipFormatter: (params) => `That's a custom tooltip for: ${params.name}`
};
TooltipFormatter.args = TooltipFormatterProps;
TooltipFormatter.parameters = buildReactPropsAsString(TooltipFormatterProps, 'PieWidget');
