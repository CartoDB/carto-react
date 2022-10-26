import React from 'react';
import ComparativePieWidgetUI from '../../../src/widgets/ComparativePieWidgetUI';

const options = {
  title: 'Custom Components/ComparativePieWidgetUI',
  component: ComparativePieWidgetUI
};

export default options;

const Template = (args) => <ComparativePieWidgetUI {...args} />;

export const Default = Template.bind({});
Default.args = {
  names: ['name 1', 'name 2'],
  data: [
    [
      { name: 'data 1', value: 40 },
      { name: 'data 2', value: 60 },
    ],
    [
      { name: 'data 1', value: 30 },
      { name: 'data 2', value: 70 },
    ],
  ],
  labels: [
    ['label 1', 'label 2'],
    ['label 1', 'label 2'],
  ],
  colors: [
    ['#6732a8', '#32a852'],
    ['#a83232', '#ff9900'],
  ],
  selectedCategories: ['data 1']
};
