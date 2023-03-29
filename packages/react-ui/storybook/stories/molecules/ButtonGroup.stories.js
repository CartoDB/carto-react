import React from 'react';
import { Grid, ButtonGroup } from '@mui/material';
import Button from '../../../src/components/atoms/Button';
import ArrowDropIcon from '../../../src/assets/icons/ArrowDropIcon';

const options = {
  title: 'Molecules/Button Group',
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'contained', 'outlined']
      }
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    },
    color: {
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
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A27945'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const ButtonRow = ({ label, icon, size, disabled, variant, ...rest }) => {
  return (
    <Grid item>
      <ButtonGroup {...rest} size={size} variant={variant}>
        <Button>{label}</Button>
        <Button disabled={disabled}>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Grid>
  );
};

const PlaygroundTemplate = ({ label, icon, ...rest }) => (
  <Grid container spacing={2}>
    <ButtonGroup {...rest}>
      <Button>{label}</Button>
      <Button>{label}</Button>
      <Button>{label}</Button>
    </ButtonGroup>
  </Grid>
);

const ButtonTemplate = ({ label, icon, ...rest }) => {
  const smallLabel = label ? label : 'Small button';
  const mediumLabel = label ? label : 'Normal button';
  const largeLabel = label ? label : 'Large button';
  const disabledLabel = label ? label : 'Disabled button';

  return (
    <Grid item container spacing={2}>
      <ButtonRow {...rest} label={smallLabel} size='small' />
      <ButtonRow {...rest} label={mediumLabel} size='medium' />
      <ButtonRow {...rest} label={largeLabel} size='large' />
      <ButtonRow {...rest} label={disabledLabel} disabled />
    </Grid>
  );
};

const ColorTemplate = ({ label, icon, ...rest }) => {
  const containedLabel = label ? label : 'Contained button';
  const outlinedLabel = label ? label : 'Outlined button';
  const textLabel = label ? label : 'Text button';

  return (
    <Grid container direction='column' spacing={2}>
      <ButtonRow {...rest} label={containedLabel} variant='contained' />
      <ButtonRow {...rest} label={outlinedLabel} variant='outlined' />
      <ButtonRow {...rest} label={textLabel} variant='text' />
    </Grid>
  );
};

const SplitTemplate = ({ ...rest }) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <ButtonGroup {...rest} variant='outlined' size='small'>
          <Button>{'Button'}</Button>
          <Button>
            <ArrowDropIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='contained' size='medium'>
          <Button>{'Button'}</Button>
          <Button>
            <ArrowDropIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='outlined' size='large'>
          <Button>{'Button'}</Button>
          <Button>
            <ArrowDropIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='outlined'>
          <Button disabled>{'Disabled'}</Button>
          <Button>
            <ArrowDropIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='outlined' orientation='vertical'>
          <Button>{'Button'}</Button>
          <Button>
            <ArrowDropIcon />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

const VerticalTemplate = ({ ...rest }) => {
  return (
    <Grid container spacing={4}>
      <ButtonTemplate {...rest} variant='contained' />
      <ButtonTemplate {...rest} variant='outlined' />
      <ButtonTemplate {...rest} variant='text' />
    </Grid>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { label: 'Button' };

export const Contained = ButtonTemplate.bind({});
Contained.args = { variant: 'contained' };

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { variant: 'outlined' };

export const Text = ButtonTemplate.bind({});
Text.args = { variant: 'text' };

export const Primary = ColorTemplate.bind({});
Primary.args = { color: 'primary' };

export const Secondary = ColorTemplate.bind({});
Secondary.args = { color: 'secondary' };

export const Default = ColorTemplate.bind({});
Default.args = { color: 'default' };

export const Vertical = VerticalTemplate.bind({});
Vertical.args = { color: 'primary', orientation: 'vertical' };

export const Split = SplitTemplate.bind({});
Split.args = { variant: 'outlined', color: 'primary' };
