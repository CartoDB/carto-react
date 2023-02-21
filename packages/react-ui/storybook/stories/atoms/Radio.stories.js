import React from 'react';
import { FormControlLabel, Grid, Radio } from '@mui/material';

const options = {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    disabled: {
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29704'
    },
    status: {
      type: 'validated'
    },
    storySource: {
      componentPath: '/src/theme/sections/components/forms.js'
    }
  }
};
export default options;

const RadioTemplate = ({ label, size, checked, disabled, ...args }) => {
  return (
    <FormControlLabel
      value={label}
      control={<Radio size={size} checked={checked} disabled={disabled} />}
      label={label}
    />
  );
};

const StatesTemplate = ({ size, ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Radio size={size} checked />}
            label='Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Radio size={size} />} label='Inactive' {...args} />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Radio size={size} checked disabled />}
            label='Disabled Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Radio size={size} disabled />}
            label='Disabled Inactive'
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Radio size='small' checked />}
            label='Small Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Radio size='small' />}
            label='Small Inactive'
            {...args}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel control={<Radio checked />} label='Medium Active' {...args} />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Radio />} label='Medium Inactive' {...args} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const disabledSizesArgTypes = {
  size: { table: { disable: true } },
  checked: { table: { disable: true } }
};

const disabledStatesArgTypes = {
  checked: { table: { disable: true } },
  disabled: { table: { disable: true } }
};

export const Playground = RadioTemplate.bind({});
Playground.args = { label: 'Text' };

export const States = StatesTemplate.bind({});
States.argTypes = disabledStatesArgTypes;
States.args = { size: 'medium' };

export const Sizes = SizeTemplate.bind({});
Sizes.argTypes = disabledSizesArgTypes;
Sizes.args = { disabled: false };
