import React from 'react';
import PieWidgetUI from '../../../src/widgets/PieWidgetUI/PieWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Widgets/PieWidgetUI',
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

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <PieWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <PieWidgetUI {...args} />
    </>
  );
};

export const Default = Template.bind({});
const DefaultProps = { data: dataDefault };
Default.args = DefaultProps;

export const CollapseMoreThan12Categories = Template.bind({});
const CollapseCategoriesProps = {
  data: [
    { name: 'Dogs', value: 100 },
    { name: 'Cats', value: 120 },
    { name: 'Rabbits', value: 150 },
    { name: 'Canaries', value: 90 },
    { name: 'Passerines', value: 200 },
    { name: 'Elephants', value: 100 },
    { name: 'Mamouths', value: 120 },
    { name: 'Torttles', value: 150 },
    { name: 'Spiders', value: 80 },
    { name: 'Frogs', value: 30 },
    { name: 'Pigeons', value: 150 },
    { name: 'Owls', value: 90 },
    { name: 'Snakes', value: 80 },
    { name: 'Birds', value: 220 }
  ]
};
CollapseMoreThan12Categories.args = CollapseCategoriesProps;

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
    { name: 'Snakes', value: 90 }
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
    '#467378'
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

export const Loading = LoadingTemplate.bind({});
const LoadingProps = { data: dataDefault, isLoading: true };
Loading.args = LoadingProps;
