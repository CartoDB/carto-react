import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import LabelWithIndicator from '../../../src/components/atoms/LabelWithIndicator';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Atoms/Input Label',
  component: InputLabel,
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
  return <InputLabel {...args}>{label}</InputLabel>;
};

const CompositionTemplate = ({ label, ...args }) => {
  return (
    <FormControl {...args} size='small'>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput placeholder='Input text' />
    </FormControl>
  );
};

const RequiredTemplate = ({ label, ...args }) => {
  return (
    <>
      <Typography variant='body2' mb={4}>
        {'Use <LabelWithIndicator /> component inside the Label'}
      </Typography>

      <Typography variant='body1' mb={2}>
        {'Required'}
      </Typography>

      <FormControl {...args} size='small'>
        <InputLabel>
          <LabelWithIndicator label={label} type='required' />
        </InputLabel>
        <OutlinedInput placeholder='Input text' />
      </FormControl>

      <Typography variant='body1' mt={4} mb={2}>
        {'Optional'}
      </Typography>

      <FormControl {...args} size='small'>
        <InputLabel>
          <LabelWithIndicator label={label} />
        </InputLabel>
        <OutlinedInput placeholder='Input text' />
      </FormControl>
    </>
  );
};

const commonArgs = {
  label: 'Label text'
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Composition = CompositionTemplate.bind({});
Composition.args = { ...commonArgs };

export const Required = RequiredTemplate.bind({});
Required.args = { ...commonArgs };
