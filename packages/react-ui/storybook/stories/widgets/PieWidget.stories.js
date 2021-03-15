import React from 'react';
import { Provider } from 'react-redux';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';
import * as cartoSlice from '../../../../react-redux/src/slices/cartoSlice';
import PieWidget from '../../../../react-widgets/src/widgets/PieWidget';
import { mockAppStoreConfiguration } from './utils';

const store = mockAppStoreConfiguration();
store.dispatch(cartoSlice.setWidgetLoadingState({ widgetId: 'sb-pie-id', isLoading: false }));

const mockedData = [...Array(10)].map((_, idx) => ({
  'sb-column': `Category ${idx < 2 ? '1' : idx < 4 ? '2' : idx < 8 ? '3' : idx < 9 ? '4' : '5'}`,
  'sb-operation-column': idx * 100
}));
store.dispatch(cartoSlice.setViewportFeatures({ sourceId: 'sb-data-source', features: mockedData }));

const options = {
  title: 'Widgets/PieWidget',
  component: PieWidget,
  decorators: [(Story) => <Provider store={store}><Story /></Provider>],
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

const Template = (args) => <PieWidget {...args} />;

const DEFAULT_PROPS = {
  id: 'sb-pie-id',
  title: 'wrapper title',
  dataSource: 'sb-data-source',
  column: 'sb-column',
  operationColumn: 'sb-operation-column',
  operation: 'count'
};

export const Default = Template.bind({});
Default.args = DEFAULT_PROPS;

export const WithFormatter = Template.bind({});
WithFormatter.args = { ...DEFAULT_PROPS, formatter: (v) => `$${v}` };

export const TooltipFormatter = Template.bind({});
TooltipFormatter.args = {
  ...DEFAULT_PROPS,
  tooltipFormatter: (params) => `That's a custom tooltip for: ${params.name}`
};
