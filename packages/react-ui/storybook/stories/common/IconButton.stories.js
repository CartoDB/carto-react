import React from 'react';
import { IconButton, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';

const options = {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    color: {
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    disabled: {
      defaultValue: false,
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1761%3A30090'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const IconButtons = ({ color, label, size, disabled, ...rest }) => (
  <Grid item xs={3}>
    <IconButton
      {...rest}
      aria-label={label}
      color={color}
      size={size}
      disabled={disabled}
    >
      <Delete fontSize='inherit' />
    </IconButton>
  </Grid>
);

const PlaygroundTemplate = ({ label, size, color, ...rest }) => (
  <Grid container spacing={2}>
    <IconButtons {...rest} color={color} label={label} size={size} />
  </Grid>
);

const ButtonTemplate = ({ label, ...rest }) => {
  const smallLabel = label ? label : 'Small icon button';
  const mediumLabel = label ? label : 'Medium icon button';
  const largeLabel = label ? label : 'Large icon button';
  const disabledLabel = label ? label : 'Disabled icon button';

  return (
    <Grid container spacing={2}>
      <IconButtons {...rest} label={smallLabel} size='small' />
      <IconButtons {...rest} label={mediumLabel} size='medium' />
      <IconButtons {...rest} label={largeLabel} size='large' />
      <IconButtons {...rest} label={disabledLabel} disabled />
    </Grid>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { label: 'Icon Button' };

export const PrimaryColor = ButtonTemplate.bind({});
PrimaryColor.args = { color: 'primary' };

export const SecondaryColor = ButtonTemplate.bind({});
SecondaryColor.args = { color: 'secondary' };

export const DefaultColor = ButtonTemplate.bind({});
DefaultColor.args = { color: 'default' };
