import React from 'react';
import { Provider } from 'react-redux';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY
} from '@storybook/addon-docs';
import * as cartoSlice from '../../../../react-redux/src/slices/cartoSlice';
import { AggregationTypes } from '../../../../react-core/src';
import CategoryWidget from '../../../../react-widgets/src/widgets/CategoryWidget';
import { mockAppStoreConfiguration } from './utils';
import { buildReactPropsAsString } from '../../utils/utils';

const store = mockAppStoreConfiguration();

const mockedData = [...Array(30)].map((_, idx) => ({
  'sb-column': `Category ${
    idx < 5 ? '1' : idx < 10 ? '2' : idx < 15 ? '3' : idx < 20 ? '4' : '5'
  }`,
  'sb-operation-column': idx * 100
}));
// store.dispatch(
//   cartoSlice.setViewportFeatures({ sourceId: 'sb-data-source', features: mockedData })
// );

const options = {
  title: 'Widgets/CategoryWidget',
  component: CategoryWidget,
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

const Template = (args) => <CategoryWidget {...args} />;

const DEFAULT_PROPS = {
  id: 'sb-category-id',
  title: 'wrapper title',
  dataSource: 'sb-data-source',
  column: 'sb-column',
  operationColumn: 'sb-operation-column',
  operation: 'sum'
};

export const Default = Template.bind({});
Default.args = DEFAULT_PROPS;
Default.parameters = buildReactPropsAsString(DEFAULT_PROPS, 'CategoryWidget');

export const WithFormatter = Template.bind({});
const WithFormatterProps = { ...DEFAULT_PROPS, formatter: (v) => `$${v}` };
WithFormatter.args = WithFormatterProps;
WithFormatter.parameters = buildReactPropsAsString(WithFormatterProps, 'CategoryWidget');

export const WithCustomLabels = Template.bind({});
const WithCustomLabelsProps = {
  ...DEFAULT_PROPS,
  labels: {
    'Category 1': 'Cat. 1',
    'Category 2': 'Cat. 2',
    'Category 3': 'Cat. 3',
    'Category 4': 'Cat. 4',
    'Category 5': 'Cat. 5'
  }
};
WithCustomLabels.args = WithCustomLabelsProps;
WithCustomLabels.parameters = buildReactPropsAsString(
  WithCustomLabelsProps,
  'CategoryWidget'
);
