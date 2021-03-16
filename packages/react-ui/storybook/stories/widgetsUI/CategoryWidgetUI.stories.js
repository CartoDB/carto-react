import React from 'react';
import CategoryWidgetUI from '../../../src/widgets/CategoryWidgetUI';

const options = {
  title: 'WidgetsUI/CategoryWidgetUI',
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
Default.args = { data };

export const OnlyData = Template.bind({});
OnlyData.args = { data };

export const WithFormatter = Template.bind({});
WithFormatter.args = { data };

export const WithCustomLabels = Template.bind({});
WithCustomLabels.args = {
  data,
  labels: {
    'Category 1': 'Cat. 1',
    'Category 2': 'Cat. 2',
    'Category 3': 'Cat. 3',
    'Category 4': 'Cat. 4'
  }
};

export const WithSelectedCategories = Template.bind({});
WithSelectedCategories.args = {
  data: filteredData,
  selectedCategories: ['Category 2', 'Category 4'],
  onSelectedCategoriesChange: (categories) => console.log(categories)
};
