import React from 'react';
import CategoryWidgetUI from '../../widgets/CategoryWidgetUI';

const options = {
  title: 'Widgets/CategoryWidgetUI',
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

const Template = (args) => <CategoryWidgetUI {...args}></CategoryWidgetUI>;
const data = [
  { name: 'categoryA', value: 100 },
  { name: 'categoryB', value: 120 },
  { name: 'categoryC', value: 150 },
  { name: 'categoryD', value: 90 },
  { name: 'categoryE', value: 200 },
  { name: 'categoryF', value: 20 },
  { name: 'categoryG', value: 90 }
];

const dataFiltered = [
  { name: 'categoryA', value: null },
  { name: 'categoryB', value: 120 },
  { name: 'categoryC', value: 100 },
  { name: 'categoryD', value: null }
];

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
    categoryA: 'Cat. A',
    categoryB: 'Cat. B',
    categoryC: 'Cat. C',
    categoryD: 'Cat. D'
  }
};

export const WithSelectedCategories = Template.bind({});
WithSelectedCategories.args = {
  data: dataFiltered,
  selectedCategories: ['categoryB', 'categoryC'],
  onSelectedCategoriesChange: (categories) => console.log(categories)
};
