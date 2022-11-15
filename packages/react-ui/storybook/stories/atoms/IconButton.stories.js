import React from 'react';
import { IconButton, Grid, Tooltip } from '@mui/material';
import { CheckCircleOutlined } from '@mui/icons-material';
import Typography from '../../../src/components/atoms/Typography';

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
      type: 'validated'
    }
  }
};
export default options;

const IconButtons = ({ color, label, size, disabled, title, ...rest }) => {
  const tooltipHelp = '(Unless noted, must be wrapped in a Tooltip)';

  return (
    <Grid item xs={3}>
      <Grid container direction='column' alignItems='center' spacing={2}>
        {title && <Typography variant='body2'>{title}</Typography>}
        <Tooltip title={`${label} ${tooltipHelp}`} placement='top'>
          <IconButton
            {...rest}
            aria-label={label}
            color={color}
            size={size}
            disabled={disabled}
          >
            <CheckCircleOutlined />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const PlaygroundTemplate = ({ label, size, color, ...rest }) => (
  <Grid container spacing={2}>
    <IconButtons {...rest} color={color} label={label} size={size} />
  </Grid>
);

const ButtonTemplate = ({ label, ...rest }) => {
  const smallLabel = label ? label : 'Small';
  const mediumLabel = label ? label : 'Medium';
  const largeLabel = label ? label : 'Large';
  const disabledLabel = label ? label : 'Disabled';

  return (
    <Grid container spacing={2}>
      <IconButtons {...rest} label={smallLabel} size='small' title='Small' />
      <IconButtons {...rest} label={mediumLabel} size='medium' title='Medium' />
      <IconButtons {...rest} label={largeLabel} size='large' title='Large' />
      <IconButtons {...rest} label={disabledLabel} disabled title='Disabled' />
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
