import React from 'react';
import FormulaWidgetUI from '../../../src/widgets/FormulaWidgetUI';

const options = {
  title: 'Widgets UI/FormulaWidgetUI',
  component: FormulaWidgetUI,
  argTypes: {
    formatter: {
      table: {
        disable: true
      }
    }
  }
};

export default options;

const Template = (args) => <FormulaWidgetUI {...args} />;

const data = 10000;

export const Empty = Template.bind({});
Empty.args = {};

export const Text = Template.bind({});
Text.args = { data: `$${data}` };

export const ValueUnit = Template.bind({});
ValueUnit.args = { data: { value: data, unit: '$' } };

export const FormatterText = Template.bind({});
FormatterText.args = { data, formatter: (v) => `$${v}` };

export const FormatterValueUnit = Template.bind({});
FormatterValueUnit.args = { data };

export const FormatterValueUnitBefore = Template.bind({});
FormatterValueUnitBefore.args = {
  data,
  unitBefore: true
};
