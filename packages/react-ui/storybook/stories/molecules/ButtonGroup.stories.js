import React from 'react';
import { Button, Grid, ButtonGroup } from '@mui/material';

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
      <Grid item container>
        <ButtonGroup {...rest} size='small'>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size='medium'>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size='large'>
          <Button>{largeLabel}</Button>
          <Button>{largeLabel}</Button>
          <Button>{largeLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size='large'>
          <Button>{largeLabel}</Button>
          <Button disabled>{disabledLabel}</Button>
          <Button>{largeLabel}</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export const Default = PlaygroundTemplate.bind({});
Default.args = { label: 'Button' };

export const Contained = ButtonTemplate.bind({});
Contained.args = { variant: 'contained' };

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { variant: 'outlined' };

export const Base = ButtonTemplate.bind({});
Base.args = { variant: 'text' };

export const ContainedPrimary = ButtonTemplate.bind({});
ContainedPrimary.args = { variant: 'contained', color: 'primary' };

export const OutlinedPrimary = ButtonTemplate.bind({});
OutlinedPrimary.args = { variant: 'outlined', color: 'primary' };

export const BasePrimary = ButtonTemplate.bind({});
BasePrimary.args = { variant: 'text', color: 'primary' };

export const Vertical = ButtonTemplate.bind({});
Vertical.args = { variant: 'text', color: 'primary', orientation: 'vertical' };
