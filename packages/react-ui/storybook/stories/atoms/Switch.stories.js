import React from 'react';
import { FormControlLabel, Grid, Switch } from '@mui/material';

const options = {
  title: 'Atoms/Switch',
  component: Switch,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary']
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A33096'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = ({ label, color, ...args }) => {
  return <FormControlLabel control={<Switch color={color} />} label={label} {...args} />;
};

const SwitchTemplate = ({ color, ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel control={<Switch color={color} />} label='Off' {...args} />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Switch color={color} defaultChecked />}
            label='On'
            {...args}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Switch color={color} disabled />}
            label='Disabled Off'
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Switch color={color} defaultChecked disabled />}
            label='Disabled On'
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Primary = SwitchTemplate.bind({});
Primary.args = {};

export const Secondary = SwitchTemplate.bind({});
Secondary.args = { color: 'secondary' };
