import React from 'react';
import Typography from '../../../src/components/atoms/Typography';
import ButtonComp from '../../../src/components/atoms/Button';
import { DocContainer } from '../../utils/storyStyles';

const options = {
  title: 'Foundations/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'button',
          'caption',
          'overline',
          'overlineDelicate',
          'code1',
          'code2',
          'code3'
        ]
      }
    },
    weight: {
      control: {
        type: 'select',
        options: ['regular', 'medium', 'strong']
      }
    },
    italic: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    color: {
      description: 'Any theme color, default and custom ones',
      control: {
        type: 'select',
        options: ['primary.dark', 'brand.navyBlue', 'default.main']
      }
    },
    noWrap: {
      defaultValue: false,
      description:
        'If `true`, the text will not wrap and will truncate with an ellipsis. Note that this can only happen with block or inline-block elements (it needs to have a width in order to overflow).',
      control: {
        type: 'boolean'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=4662%3A14'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = (args) => <Typography {...args}>{args.text}</Typography>;

const DocTemplate = () => {
  return (
    <DocContainer
      severity='warning'
      action={
        <ButtonComp
          variant='outlined'
          size='small'
          color='inherit'
          href='/?path=/docs/foundations-typography-guide--page'
        >
          Guide
        </ButtonComp>
      }
    >
      Check the usage guide before using CARTO typographies
    </DocContainer>
  );
};

export const Playground = Template.bind({});
Playground.args = { variant: 'h1', text: 'H1 Headline' };

export const Guide = DocTemplate.bind({});

export const H1 = Template.bind({});
H1.args = { variant: 'h1', text: 'H1 Headline' };

export const H2 = Template.bind({});
H2.args = { variant: 'h2', text: 'H2 Headline' };

export const H3 = Template.bind({});
H3.args = { variant: 'h3', text: 'H3 Headline' };

export const H4 = Template.bind({});
H4.args = { variant: 'h4', text: 'H4 Headline' };

export const H5 = Template.bind({});
H5.args = { variant: 'h5', text: 'H5 Headline' };

export const H6 = Template.bind({});
H6.args = { variant: 'h6', text: 'H6 Headline' };

export const Subtitle1 = Template.bind({});
Subtitle1.args = { variant: 'subtitle1', text: 'Subtitle 1' };

export const Subtitle2 = Template.bind({});
Subtitle2.args = { variant: 'subtitle2', text: 'Subtitle 2' };

export const Body1 = Template.bind({});
Body1.args = { variant: 'body1', text: 'Body 1' };

export const Body2 = Template.bind({});
Body2.args = { variant: 'body2', text: 'Body 2' };

export const Button = Template.bind({});
Button.args = { variant: 'button', text: 'Button' };

export const Caption = Template.bind({});
Caption.args = { variant: 'caption', text: 'Caption' };

export const Overline = Template.bind({});
Overline.args = { variant: 'overline', text: 'Overline' };

// Custom variants
export const OverlineDelicate = Template.bind({});
OverlineDelicate.args = { variant: 'overlineDelicate', text: 'Overline Delicate' };

export const Code1 = Template.bind({});
Code1.args = {
  variant: 'code1',
  text: 'Code 1'
};

export const Code2 = Template.bind({});
Code2.args = {
  variant: 'code2',
  text: 'Code 2'
};

export const Code3 = Template.bind({});
Code3.args = {
  variant: 'code3',
  text: 'Code 3'
};
