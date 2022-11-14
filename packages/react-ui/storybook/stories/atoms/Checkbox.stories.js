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
      type: 'readyToReview'
    }
  }
};
export default options;

const Template = ({ label, size, ...args }) => {
  return <FormControlLabel control={<Checkbox size={size} />} label={label} {...args} />;
};

const StatesTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox checked />} label='Active' {...args} />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox />} label='Inactive' {...args} />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked indeterminate />}
            label='Indeterminate'
            {...args}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked disabled />}
            label='Disabled Active'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox disabled />}
            label='Disabled Inactive'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox checked indeterminate disabled />}
            label='Disabled Indeterminate'
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const SizeTemplate = ({ size, ...args }) => {
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

export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const States = StatesTemplate.bind({});

export const Sizes = SizeTemplate.bind({});
