import React from 'react';
import CategoryWidgetUI from '../../../src/widgets/CategoryWidgetUI/CategoryWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

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

const Template = (args) => {
  return <CategoryWidgetUI {...args} />;
};

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <CategoryWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <CategoryWidgetUI {...args} />
    </>
  );
};

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

export const OnlyData = Template.bind({});
OnlyData.args = DefaultProps;

export const WithFormatter = Template.bind({});
WithFormatter.args = DefaultProps;

export const WithCustomLabels = Template.bind({});
const WithCustomLabelsProps = {
  ...DefaultProps,
  labels: {
    'Category 1': 'Cat. 1',
    'Category 2': 'Cat. 2',
    'Category 3': 'Cat. 3',
    'Category 4': 'Cat. 4'
  }
};
WithCustomLabels.args = WithCustomLabelsProps;

export const WithSelectedCategories = Template.bind({});
const WithSelectedCategoriesProps = {
  data: filteredData,
  selectedCategories: ['Category 2', 'Category 4'],
  onSelectedCategoriesChange: (categories) => console.log(categories)
};
WithSelectedCategories.args = WithSelectedCategoriesProps;

export const Loading = LoadingTemplate.bind({});
const LoadingProps = { data, isLoading: true };
Loading.args = LoadingProps;
