import React from 'react';
import FormulaWidgetUI from '../../../src/widgets/FormulaWidgetUI';

const options = {
  title: 'Organisms/Widgets/FormulaWidgetUI',
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

export default options;

const Template = (args) => <FormulaWidgetUI {...args} />;

const data = 10000;

export const Empty = Template.bind({});
Empty.args = { data };

export const Text = Template.bind({});
const TextProps = { data: `$${data}` };
Text.args = TextProps;

export const ValuePrefix = Template.bind({});
const ValuePrefixProps = { data: { value: data, prefix: '$' } };
ValuePrefix.args = ValuePrefixProps;

export const ValueSuffix = Template.bind({});
const ValueSuffixProps = { data: { value: data, suffix: '€' } };
ValueSuffix.args = ValueSuffixProps;

export const FormatterText = Template.bind({});
const FormatterTextProps = { data, formatter: (v) => `${v} euros` };
FormatterText.args = FormatterTextProps;

// export const FormatterValueUnit = Template.bind({});
// const FormatterValueUnitProps = { data };
// FormatterValueUnit.args = FormatterValueUnitProps;

// export const FormatterValueUnitBefore = Template.bind({});
// const FormatterValueUnitBeforeProps = {
//   data,
//   unitBefore: true
// };
// FormatterValueUnitBefore.args = FormatterValueUnitBeforeProps;
