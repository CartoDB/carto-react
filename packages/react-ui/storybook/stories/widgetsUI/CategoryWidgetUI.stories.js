import React from 'react';
import CategoryWidgetUI from '../../../src/widgets/CategoryWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/CategoryWidgetUI',
  component: CategoryWidgetUI,
  argTypes: {
    selectedCategories: {
      table: { disable: true }
    },
    onSelectedCategoriesChange: {
      table: { disable: true }
    },
    order: {
      defaultValue: 'ranking',
      control: {
        type: 'select',
        options: ['ranking', 'fixed']
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

const Template = (args) => <CategoryWidgetUI {...args} />;

const data = [...Array(7)].map((_, idx) => ({
  name: `Category ${idx + 1}`,
  value: idx * 100
}));

const filteredData = data.slice(0, 4).map((cat, idx) => {
  return { ...cat, value: idx % 2 === 0 ? null : cat.value };
});

export const Default = Template.bind({});
const DefaultProps = { data };
Default.args = DefaultProps;
Default.parameters = buildReactPropsAsString(DefaultProps, 'CategoryWidgetUI');

export const OnlyData = Template.bind({});
OnlyData.args = DefaultProps;
OnlyData.parameters = buildReactPropsAsString(DefaultProps, 'CategoryWidgetUI');

export const WithFormatter = Template.bind({});
WithFormatter.args = DefaultProps;
WithFormatter.parameters = buildReactPropsAsString(DefaultProps, 'CategoryWidgetUI');

export const WithCustomLabels = Template.bind({});
const WithCustomLabelsProps = {
  data,
  labels: {
    'Category 1': 'Cat. 1',
    'Category 2': 'Cat. 2',
    'Category 3': 'Cat. 3',
    'Category 4': 'Cat. 4'
  }
};
WithCustomLabels.args = WithCustomLabelsProps;
WithCustomLabels.parameters = buildReactPropsAsString(
  WithCustomLabelsProps,
  'CategoryWidgetUI'
);

export const WithSelectedCategories = Template.bind({});
const WithSelectedCategoriesProps = {
  data: filteredData,
  selectedCategories: ['Category 2', 'Category 4'],
  onSelectedCategoriesChange: (categories) => console.log(categories)
};
WithSelectedCategories.args = WithSelectedCategoriesProps;
WithSelectedCategories.parameters = buildReactPropsAsString(
  WithSelectedCategoriesProps,
  'CategoryWidgetUI'
);
