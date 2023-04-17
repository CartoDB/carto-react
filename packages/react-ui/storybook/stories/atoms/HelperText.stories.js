import React from 'react';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

const options = {
  title: 'Atoms/Helper Text',
  component: FormHelperText,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    error: {
      control: {
        type: 'boolean'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?node-id=1534-33807&t=dVNCJzz6IduwAMHg-0'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = ({ label, ...args }) => {
  return <FormHelperText {...args}>{label}</FormHelperText>;
};

const CompositionTemplate = ({ label, ...args }) => {
  return (
    <FormControl {...args} size='small'>
      <OutlinedInput placeholder='Input text' />
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
};

const commonArgs = {
  label: 'Helper text to be placed below an input'
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Composition = CompositionTemplate.bind({});
Composition.args = { ...commonArgs };
