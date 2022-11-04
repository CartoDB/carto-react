import React from 'react';
import PieWidgetUI from '../../../src/widgets/PieWidgetUI';

const options = {
  title: 'Organisms/Widgets/PieWidgetUI',
  component: PieWidgetUI,
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

export default options;

const dataDefault = [
  { name: 'Women', value: 101 },
  { name: 'Men', value: 100 }
];

const Template = (args) => <PieWidgetUI {...args} />;

export const Default = Template.bind({});
const DefaultProps = { data: dataDefault };
Default.args = DefaultProps;

export const CustomColors = Template.bind({});
const CustomColorsProps = {
  data: [
    { name: 'Dogs', value: 100 },
    { name: 'Cats', value: 120 },
    { name: 'Rabbits', value: 150 },
    { name: 'Canaries', value: 90 },
    { name: 'Passerines', value: 200 },
    { name: 'Elephants', value: 100 },
    { name: 'Mamouths', value: 120 },
    { name: 'Torttles', value: 150 },
    { name: 'Snakes', value: 90 },
    { name: 'others', value: 200 }
  ],
  colors: [
    '#855C75',
    '#D9AF6B',
    '#AF6458',
    '#736F4C',
    '#526A83',
    '#625377',
    '#68855C',
    '#9C9C5E',
    '#A06177',
    '#8C785D',
    '#467378',
    '#7C7C7C'
  ]
};
CustomColors.args = CustomColorsProps;

export const SelectedCategories = Template.bind({});
const SelectedCategoriesProps = {
  data: [
    { name: 'Dogs', value: 100 },
    { name: 'Cats', value: 120 },
    { name: 'Rabbits', value: 150 },
    { name: 'Canaries', value: 90 },
    { name: 'Passerines', value: 200 }
  ],
  selectedCategories: ['Cats', 'Canaries'],
  onSelectedCategoriesChange: (categories) => console.log(categories)
};
SelectedCategories.args = SelectedCategoriesProps;
