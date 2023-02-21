import React from 'react';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';

const options = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: {
        type: 'boolean'
      }
    },
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
    indeterminate: {
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28751'
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

const CheckboxTemplate = ({ label, size, checked, indeterminate, disabled, ...args }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          size={size}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
        />
      }
      label={label}
      {...args}
    />
  );
};

const StatesTemplate = ({ size, ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size={size} checked />}
            label='Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size={size} />}
            label='Inactive'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size={size} checked indeterminate />}
            label='Indeterminate'
            {...args}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size={size} checked disabled />}
            label='Disabled Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size={size} disabled />}
            label='Disabled Inactive'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size={size} checked indeterminate disabled />}
            label='Disabled Indeterminate'
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
            control={<Checkbox size='small' checked />}
            label='Small Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size='small' />}
            label='Small Inactive'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox size='small' checked indeterminate />}
            label='Small Indeterminate'
            {...args}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked />}
            label='Medium Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox />} label='Medium Inactive' {...args} />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked indeterminate />}
            label='Medium Indeterminate'
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const disabledSizesArgTypes = {
  size: { table: { disable: true } },
  checked: { table: { disable: true } },
  indeterminate: { table: { disable: true } }
};

const disabledStatesArgTypes = {
  checked: { table: { disable: true } },
  indeterminate: { table: { disable: true } },
  disabled: { table: { disable: true } }
};

export const Playground = CheckboxTemplate.bind({});
Playground.args = { label: 'Text' };

export const States = StatesTemplate.bind({});
States.argTypes = disabledStatesArgTypes;
States.args = { size: 'medium' };

export const Sizes = SizeTemplate.bind({});
Sizes.argTypes = disabledSizesArgTypes;
Sizes.args = { disabled: false };
