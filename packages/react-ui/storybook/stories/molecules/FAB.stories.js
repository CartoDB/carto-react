import React from 'react';
import { Fab, Grid } from '@mui/material';
import { Add, Close, Edit } from '@mui/icons-material';

const options = {
  title: 'Molecules/FAB Button',
  component: Fab,
  argTypes: {
    variant: {
      defaultValue: 'contained',
      control: {
        type: 'select',
        options: ['default', 'extended']
      }
    },
    color: {
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28899'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const FABButtons = ({ label, size, disabled, variant, ...rest }) => {
  const customLabel = label ? label : 'Label';

  return (
    <>
      <Grid item>
        <Fab {...rest} size={size} variant={variant} disabled={disabled} aria-label='add'>
          <Add />
        </Fab>
      </Grid>
      <Grid item>
        <Fab {...rest} size={size} disabled={disabled} aria-label='edit'>
          <Edit />
        </Fab>
      </Grid>
      <Grid item>
        <Fab
          {...rest}
          size={size}
          variant='extended'
          disabled={disabled}
          aria-label={customLabel}
        >
          <Close />
          {customLabel}
        </Fab>
      </Grid>
      <Grid item>
        <Fab {...rest} size={size} variant={variant} disabled aria-label='add'>
          <Add />
        </Fab>
      </Grid>
      <Grid item>
        <Fab {...rest} size={size} disabled aria-label='edit'>
          <Edit />
        </Fab>
      </Grid>
      <Grid item>
        <Fab {...rest} size={size} variant='extended' disabled aria-label={customLabel}>
          <Close />
          {customLabel}
        </Fab>
      </Grid>
    </>
  );
};

const Template = ({ label, size, color, ...rest }) => (
  <Grid container alignItems='center' spacing={2}>
    <FABButtons {...rest} color={color} label={label} size={size} />
  </Grid>
);

const SizeTemplate = ({ label, color, ...rest }) => (
  <Grid container spacing={3}>
    <Grid container item alignItems='center' spacing={2}>
      <FABButtons {...rest} color={color} label='Large' size='large' />
    </Grid>

    <Grid container item alignItems='center' spacing={2}>
      <FABButtons {...rest} color={color} label='Medium' size='medium' />
    </Grid>

    <Grid container item alignItems='center' spacing={2}>
      <FABButtons {...rest} color={color} label='Small' size='small' />
    </Grid>
  </Grid>
);

export const Playground = Template.bind({});

export const PrimaryColor = Template.bind({});
PrimaryColor.args = { color: 'primary' };

export const SecondaryColor = Template.bind({});
SecondaryColor.args = { color: 'secondary' };

export const Sizes = SizeTemplate.bind({});
