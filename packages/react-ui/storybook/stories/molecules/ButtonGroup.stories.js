import React from 'react';
import { Button, Grid, ButtonGroup } from '@mui/material';
import { Close } from '@mui/icons-material';

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
      type: 'readyToReview'
    }
  }
};
export default options;

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
    <Grid container spacing={2}>
      <Grid item>
        <ButtonGroup {...rest} size='small'>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} size='medium'>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} size='large'>
          <Button>{largeLabel}</Button>
          <Button>{largeLabel}</Button>
          <Button>{largeLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest}>
          <Button>{disabledLabel}</Button>
          <Button disabled>{disabledLabel}</Button>
          <Button>{disabledLabel}</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

const ColorTemplate = ({ label, icon, ...rest }) => {
  const containedLabel = label ? label : 'Contained button';
  const outlinedLabel = label ? label : 'Outlined button';
  const textLabel = label ? label : 'Text button';

  return (
    <Grid container spacing={2}>
      <Grid item>
        <ButtonGroup {...rest} variant='contained'>
          <Button>{containedLabel}</Button>
          <Button>{containedLabel}</Button>
          <Button>{containedLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='outlined'>
          <Button>{outlinedLabel}</Button>
          <Button>{outlinedLabel}</Button>
          <Button>{outlinedLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='text'>
          <Button>{textLabel}</Button>
          <Button>{textLabel}</Button>
          <Button>{textLabel}</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

const SplitTemplate = ({ ...rest }) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <ButtonGroup {...rest} variant='contained' size='small'>
          <Button>{'Button'}</Button>
          <Button>
            <Close />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='contained' size='medium'>
          <Button>{'Button'}</Button>
          <Button>
            <Close />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='contained' size='large'>
          <Button>{'Button'}</Button>
          <Button>
            <Close />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <ButtonGroup {...rest} variant='contained'>
          <Button disabled>{'Disabled'}</Button>
          <Button>
            <Close />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
export const Playground = PlaygroundTemplate.bind({});
Playground.args = { label: 'Button' };

export const Contained = ButtonTemplate.bind({});
Contained.args = { variant: 'contained' };

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { variant: 'outlined' };

export const Base = ButtonTemplate.bind({});
Base.args = { variant: 'text' };

export const Primary = ColorTemplate.bind({});
Primary.args = { color: 'primary' };

export const Secondary = ColorTemplate.bind({});
Secondary.args = { color: 'secondary' };

export const Default = ColorTemplate.bind({});
Default.args = { color: 'default' };

export const Vertical = ButtonTemplate.bind({});
Vertical.args = { variant: 'outlined', color: 'primary', orientation: 'vertical' };

export const Split = SplitTemplate.bind({});
Split.args = { variant: 'outlined', color: 'primary' };
