import React from 'react';
import { Fab, Grid } from '@mui/material';
import { Add, Close, Edit } from '@mui/icons-material';

const options = {
  title: 'Atoms/FAB Button',
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A26509'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const FABButtons = ({ label, size, disabled, variant, ...rest }) => {
  const customLabel = label ? label : 'Label';

  return (
    <Grid item container alignItems='center' spacing={2}>
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
    </Grid>
  );
};

export const Playground = FABButtons.bind({});

export const PrimaryColor = FABButtons.bind({});
PrimaryColor.args = { color: 'primary' };

export const SecondaryColor = FABButtons.bind({});
SecondaryColor.args = { color: 'secondary' };
