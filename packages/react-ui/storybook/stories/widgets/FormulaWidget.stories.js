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
import FormulaWidget from '../../../../react-widgets/src/widgets/FormulaWidget';
import { mockAppStoreConfiguration } from './utils';
import { buildReactPropsAsString } from '../../utils';

const store = mockAppStoreConfiguration();
store.dispatch(
  cartoSlice.setWidgetLoadingState({ widgetId: 'sb-formula-id', isLoading: false })
);
store.dispatch(
  cartoSlice.setViewportFeatures({
    sourceId: 'sb-data-source',
    features: [{ 'sb-column': 5000 }, { 'sb-column': 5000 }]
  })
);

const options = {
  title: 'Widgets/FormulaWidget',
  component: FormulaWidget,
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

const Template = (args) => <FormulaWidget {...args} />;

const DEFAULT_PROPS = {
  id: 'sb-formula-id',
  title: 'wrapper title',
  dataSource: 'sb-data-source',
  column: 'sb-column',
  operation: 'sum'
};

export const Default = Template.bind({});
Default.args = DEFAULT_PROPS;
Default.parameters = buildReactPropsAsString(DEFAULT_PROPS, 'FormulaWidget');

export const WithFormatter = Template.bind({});
const WithFormatterProps = { ...DEFAULT_PROPS, formatter: (v) => `$${v}` };
WithFormatter.args = WithFormatterProps;
WithFormatter.parameters = buildReactPropsAsString(WithFormatterProps, 'FormulaWidget');
