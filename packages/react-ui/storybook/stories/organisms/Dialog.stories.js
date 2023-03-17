import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormGroup,
  Grid,
  Slide,
  TextField
} from '@mui/material';

const options = {
  title: 'Organisms/Dialog',
  component: Dialog,
  argTypes: {
    disableEscapeKeyDown: {
      description: 'If `true`, hitting escape will not fire the `onClose` callback.',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    fullScreen: {
      description: 'If `true`, the dialog will be full-screen',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    fullWidth: {
      description:
        'If `true`, the dialog stretches to `maxWidth`. Notice that the dialog width grow is limited by the default margin.',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    maxWidth: {
      description:
        'Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to `false` to disable `maxWidth`.',
      defaultValue: 'md',
      control: {
        type: 'select',
        options: ['lg', 'md', 'sm', 'xl', 'xs', false]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A28896'
    },
    status: {
      type: 'needsUpdate'
    }
  }
};
export default options;

const Template = ({ content = <TextContent />, ...args }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        {...args}
      >
        <DialogTitle id='dialog-title'>Dialog title</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TextContent = () => (
  <DialogContentText id='alert-dialog-description'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc justo, tempus sit
    amet diam tristique, posuere egestas nisi. Aliquam erat volutpat. Sed eu elit nec diam
    semper porta.
  </DialogContentText>
);

const FormContent = () => (
  <>
    <DialogContentText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </DialogContentText>
    <FormGroup>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <TextField label='Label' size='small' fullWidth style={{ marginTop: 16 }} />
        </Grid>
        <Grid item>
          <TextField label='Label' size='small' fullWidth style={{ marginTop: 16 }} />
        </Grid>
      </Grid>
    </FormGroup>
  </>
);

export const Default = Template.bind({});

export const Form = Template.bind({});
Form.args = { content: <FormContent /> };

export const DisableEscapeKeyDown = Template.bind({});
DisableEscapeKeyDown.args = { disableEscapeKeyDown: true };

export const SlideTransition = Template.bind({});
SlideTransition.args = {
  TransitionComponent: Slide,
  TransitionProps: { direction: 'up', timeout: 300 }
};

export const FullScren = Template.bind({});
FullScren.args = {
  fullScreen: true,
  TransitionComponent: Slide,
  TransitionProps: { direction: 'up', timeout: 300 }
};
