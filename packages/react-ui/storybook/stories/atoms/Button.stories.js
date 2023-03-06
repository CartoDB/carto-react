import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '../../../src/components/atoms/Typography';
import Button from '../../../src/components/atoms/Button';
import { getContrastColor } from '../../../src/utils/palette';

const options = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      defaultValue: 'contained',
      control: {
        type: 'select',
        options: ['text', 'contained', 'outlined']
      }
    },
    color: {
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary', 'error']
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
      type: 'validated'
    }
  }
};
export default options;

const testColor = '#A5AA99';
const contrast = getContrastColor(testColor);

const Buttons = ({ label, size, disabled, variant, ...rest }) => (
  <Grid item container spacing={2}>
    <Grid item xs={4}>
      <Button
        {...rest}
        size={size}
        variant={variant}
        disabled={disabled}
        style={{ background: testColor }}
      >
        <span style={{ color: contrast }}>{testColor}</span>
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button
        {...rest}
        size={size}
        variant={variant}
        disabled={disabled}
        startIcon={<Add />}
      >
        {label}
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button
        {...rest}
        size={size}
        variant={variant}
        disabled={disabled}
        endIcon={<Close />}
      >
        {label}
      </Button>
    </Grid>
  </Grid>
);

const PlaygroundTemplate = ({ label, size, ...rest }) => (
  <Grid container spacing={2}>
    <Buttons {...rest} label={label} size={size} />
  </Grid>
);

const VariantTemplate = ({ label, icon, ...rest }) => {
  const smallLabel = label ? label : 'Small button';
  const mediumLabel = label ? label : 'Medium button';
  const largeLabel = label ? label : 'Large button';
  const disabledLabel = label ? label : 'Disabled button';

  return (
    <Grid container spacing={2}>
      <Buttons {...rest} label={smallLabel} size='small' />
      <Buttons {...rest} label={mediumLabel} size='medium' />
      <Buttons {...rest} label={largeLabel} size='large' />
      <Buttons {...rest} label={disabledLabel} disabled />
    </Grid>
  );
};

const ColorTemplate = ({ label, icon, ...rest }) => {
  const containedLabel = label ? label : 'Contained button';
  const outlinedLabel = label ? label : 'Outlined button';
  const textLabel = label ? label : 'Text button';

  return (
    <Grid container spacing={2}>
      <Buttons {...rest} label={containedLabel} variant='contained' />
      <Buttons {...rest} label={outlinedLabel} variant='outlined' />
      <Buttons {...rest} label={textLabel} variant='text' />
    </Grid>
  );
};

const BehaviorTemplate = ({ label, icon, ...rest }) => {
  const overflowLabel = 'Text Button with overflow';

  return (
    <Grid container direction='column' spacing={6}>
      <Grid item container direction='column' xs={4}>
        <Typography variant='body1' style={{ marginBottom: 16 }}>
          {'Overflow + tooltip'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Tooltip title={overflowLabel}>
              <Button {...rest}>{overflowLabel}</Button>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title={overflowLabel}>
              <Button {...rest} startIcon={<Add />}>
                {overflowLabel}
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title={overflowLabel}>
              <Button {...rest} endIcon={<Close />}>
                {overflowLabel}
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container direction='column' xs={4}>
        <Typography variant='body1' style={{ marginBottom: 16 }}>
          {'Pairing buttons'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button {...rest}>{'Button'}</Button>
            <Button {...rest} startIcon={<Add />}>
              {'Button'}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container direction='column' xs={4}>
        <Typography variant='body1' style={{ marginBottom: 16 }}>
          {'Loading'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <LoadingButton loading variant='outlined'>
              {'Disabled'}
            </LoadingButton>
          </Grid>
          <Grid item xs={4}>
            <LoadingButton
              loading
              loadingPosition='start'
              variant='contained'
              startIcon={<Add />}
            >
              {'Import data'}
            </LoadingButton>
          </Grid>
          <Grid item xs={4}>
            <LoadingButton
              loading
              loadingPosition='end'
              variant='contained'
              endIcon={<Close />}
            >
              {'Send email'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { label: 'Button' };

export const Contained = VariantTemplate.bind({});
Contained.args = { variant: 'contained' };

export const Outlined = VariantTemplate.bind({});
Outlined.args = { variant: 'outlined' };

export const Text = VariantTemplate.bind({});
Text.args = { variant: 'text' };

export const PrimaryColor = ColorTemplate.bind({});
PrimaryColor.args = { color: 'primary' };

export const SecondaryColor = ColorTemplate.bind({});
SecondaryColor.args = { color: 'secondary' };

export const ErrorColor = ColorTemplate.bind({});
ErrorColor.args = { color: 'error' };

export const DefaultColor = ColorTemplate.bind({});
DefaultColor.args = { color: 'default' };

export const Behavior = BehaviorTemplate.bind({});
