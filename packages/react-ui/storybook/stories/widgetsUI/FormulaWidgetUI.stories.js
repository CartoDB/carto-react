import React from 'react';
import FormulaWidgetUI from '../../../src/widgets/FormulaWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/FormulaWidgetUI',
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
Empty.args = {};
Empty.parameters = buildReactPropsAsString({ data: undefined }, 'FormulaWidgetUI');

export const Text = Template.bind({});
const TextProps = { data: `$${data}` };
Text.args = TextProps;
Text.parameters = buildReactPropsAsString(TextProps, 'FormulaWidgetUI');

export const ValueUnit = Template.bind({});
const ValueUnitProps = { data: { value: data, unit: '$' } };
ValueUnit.args = ValueUnitProps;
ValueUnit.parameters = buildReactPropsAsString(ValueUnitProps, 'FormulaWidgetUI');

export const FormatterText = Template.bind({});
const FormatterTextProps = { data, formatter: (v) => `$${v}` };
FormatterText.args = FormatterTextProps;
FormatterText.parameters = buildReactPropsAsString(FormatterTextProps, 'FormulaWidgetUI');

export const FormatterValueUnit = Template.bind({});
const FormatterValueUnitProps = { data };
FormatterValueUnit.args = FormatterValueUnitProps;
FormatterValueUnit.parameters = buildReactPropsAsString(
  FormatterValueUnitProps,
  'FormulaWidgetUI'
);

export const FormatterValueUnitBefore = Template.bind({});
const FormatterValueUnitBeforeProps = {
  data,
  unitBefore: true
};
FormatterValueUnitBefore.args = FormatterValueUnitBeforeProps;
FormatterValueUnitBefore.parameters = buildReactPropsAsString(
  FormatterValueUnitBeforeProps,
  'FormulaWidgetUI'
);
