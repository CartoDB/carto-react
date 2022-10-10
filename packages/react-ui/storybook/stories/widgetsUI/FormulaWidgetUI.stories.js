import React from 'react';
import FormulaWidgetUI from '../../../src/widgets/FormulaWidgetUI';

const options = {
  title: 'Custom Components/FormulaWidgetUI',
  component: FormulaWidgetUI,
  argTypes: {
    formatter: {
      table: {
        disable: true
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

// Temporary removed
// PR -> https://github.com/CartoDB/carto-react/pull/481
// Shortcut -> https://app.shortcut.com/cartoteam/story/263063/add-widgets-stories-to-storybook
// export default options;

const Template = (args) => <FormulaWidgetUI {...args} />;

const data = 10000;

/* export const Empty = Template.bind({});
Empty.args = {};

export const Text = Template.bind({});
const TextProps = { data: `$${data}` };
Text.args = TextProps;

export const ValueUnit = Template.bind({});
const ValueUnitProps = { data: { value: data, unit: '$' } };
ValueUnit.args = ValueUnitProps;

export const FormatterText = Template.bind({});
const FormatterTextProps = { data, formatter: (v) => `$${v}` };
FormatterText.args = FormatterTextProps;

export const FormatterValueUnit = Template.bind({});
const FormatterValueUnitProps = { data };
FormatterValueUnit.args = FormatterValueUnitProps;

export const FormatterValueUnitBefore = Template.bind({});
const FormatterValueUnitBeforeProps = {
  data,
  unitBefore: true
};
FormatterValueUnitBefore.args = FormatterValueUnitBeforeProps; */
