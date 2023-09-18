import React from 'react';
import FormulaWidgetUI from '../../../src/widgets/FormulaWidgetUI/FormulaWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Widgets/FormulaWidgetUI',
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

const Template = (args) => {
  return <FormulaWidgetUI {...args} />;
};

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <FormulaWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <FormulaWidgetUI {...args} />
    </>
  );
};

const data = 10000;

export const Empty = Template.bind({});

export const Basic = Template.bind({});
const BasicProps = { data };
Basic.args = BasicProps;

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
const formatter = (value) =>
  Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);
const FormatterTextProps = { data, formatter };
FormatterText.args = FormatterTextProps;

export const Loading = LoadingTemplate.bind({});
const LoadingProps = { data, isLoading: true };
Loading.args = LoadingProps;
