import React from 'react';
import PieWidgetUI from '../../widgets/PieWidgetUI';

// This default export determines where your story goes in the story list
export default {
  title: 'Widgets/PieWidgetUI',
  component: PieWidgetUI,
};

const dataDefault = [
  { name: 'Women', value: 101 },
  { name: 'Men', value: 100 },
];

const Template = (args) => <PieWidgetUI {...args} />;

export const Default = Template.bind({});
Default.args = { data: dataDefault };

export const CustomColors = Template.bind({});
CustomColors.args = {
  data: [
    { name: 'Dogs', value: 100, color: '#7f3c8d' },
    { name: 'Cats', value: 120, color: '#11a579' },
    { name: 'Rabbits', value: 150, color: '#3969ac' },
    { name: 'Canaries', value: 90, color: '#f2b701' },
    { name: 'Passerines', value: 200, color: '#e73f74' },
  ],
  selectedCategories: ['Passerines', 'Cats'],
  onSelectedCategoriesChange: (categories) => console.log(categories),
};