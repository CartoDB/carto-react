import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '../../../src/components/atoms/Typography';
import Button from '../../../src/components/atoms/Button';
import { DocContainer, DocTextHighlight, DocLink } from '../../utils/storyStyles';

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

const Buttons = ({ label, size, disabled, variant, ...rest }) => (
  <Grid item container spacing={2}>
    <Grid item xs={4}>
      <Button {...rest} size={size} variant={variant} disabled={disabled}>
        {label}
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

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      We have our own{' '}
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/atoms/Button.js'>
        Button
      </DocLink>{' '}
      component that uses <i>Mui Button</i> and wraps its children in a <i>Typography</i>{' '}
      component to meet with the designed behavior (text overflow case).
      <Typography variant='inherit' color='inherit' mt={2}>
        So, instead of Mui Button, you should use this one:{' '}
        <DocTextHighlight variant='inherit' component='span'>
          react-ui/src/components/atoms/Button
        </DocTextHighlight>
      </Typography>
      <Typography variant='inherit' color='inherit' mt={2}>
        For external use:{' '}
        <DocTextHighlight variant='inherit' component='span'>
          {'import { Button } from "@carto/react-ui";'}
        </DocTextHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { label: 'Button' };

export const Guide = DocTemplate.bind({});

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
