import React from 'react';
import { Button, Grid, ButtonGroup, IconButton } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const options = {
  title: 'Common/Button Group',
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
        options: ['small', 'medium']
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
  }
};
export default options;

const PlaygroundTemplate = ({ label, icon, ...rest }) => (
  <Grid container spacing={2} direction='column'>
    <Grid item>
      <ButtonGroup {...rest}>
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button disabled>{label}</Button>
      </ButtonGroup>
    </Grid>
    <Grid item>
      <ButtonGroup {...rest}>
        <Button>
          <ReplyIcon />
        </Button>
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <CloseIcon />
        </Button>
        <Button disabled>
          <CloseIcon />
        </Button>
      </ButtonGroup>
    </Grid>
  </Grid>
);
const ButtonTemplate = ({ label, icon, ...rest }) => {
  const smallLabel = label ? label : 'Small button';
  const mediumLabel = label ? label : 'Normal button';

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <ButtonGroup {...rest} size='small'>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
          <Button disabled>{smallLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size='medium'>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
          <Button disabled>{smallLabel}</Button>
        </ButtonGroup>
      </Grid>

      <Grid item container></Grid>
    </Grid>
  );
};
const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } }
};

export const Default = PlaygroundTemplate.bind({});
Default.args = { label: 'Button' };

export const Contained = ButtonTemplate.bind({});
Contained.args = { variant: 'contained' };
Contained.argTypes = disabledControlsArgTypes;

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { variant: 'outlined' };
Outlined.argTypes = disabledControlsArgTypes;

export const Base = ButtonTemplate.bind({});
Base.args = { variant: 'text' };
Base.argTypes = disabledControlsArgTypes;

export const ContainedPrimary = ButtonTemplate.bind({});
ContainedPrimary.args = { variant: 'contained', color: 'primary' };
ContainedPrimary.argTypes = disabledControlsArgTypes;

export const OutlinedPrimary = ButtonTemplate.bind({});
OutlinedPrimary.args = { variant: 'outlined', color: 'primary' };
OutlinedPrimary.argTypes = disabledControlsArgTypes;

export const BasePrimary = ButtonTemplate.bind({});
BasePrimary.args = { variant: 'text', color: 'primary' };
BasePrimary.argTypes = disabledControlsArgTypes;
