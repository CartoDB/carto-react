import React from 'react';
import LegendCategories from '../../../../src/widgets/legend/LegendCategories';

const DEFAULT_LEGEND = {
  legend: {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    colors: 'TealGrn'
  }
};

const options = {
  title: 'Widgets/Legends/LegendCategories',
  component: LegendCategories,
  argTypes: {
    legend: {}
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
  return <LegendCategories {...args} />;
};

export const Default = Template.bind({});
const DefaultProps = { ...DEFAULT_LEGEND };
Default.args = DefaultProps;

export const WithHexColors = Template.bind({});
const WithHexColorsProps = {
  legend: { ...DEFAULT_LEGEND.legend, colors: ['#f00', '#0f0', '#00f'] }
};
WithHexColors.args = WithHexColorsProps;

export const WithStrokedColors = Template.bind({});
const WithStrokedColorsProps = {
  legend: { ...DEFAULT_LEGEND.legend, isStrokeColor: true }
};
WithStrokedColors.args = WithStrokedColorsProps;
