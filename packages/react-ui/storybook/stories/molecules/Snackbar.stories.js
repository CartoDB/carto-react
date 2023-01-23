import React from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const options = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  argTypes: {
    message: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=3840%3A74274&t=8yIyrIS5EqFhj2RB-0'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const Template = ({ message, ...args }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color='secondary' variant='text' onClick={handleClose}>
        Undo
      </Button>
      <IconButton aria-label='close' color='inherit' onClick={handleClose}>
        <CloseOutlined />
      </IconButton>
    </>
  );

  return (
    <>
      <Button onClick={handleClick}>Open snackbar</Button>
      <Snackbar open={open} onClose={handleClose} message={message} action={action} />
    </>
  );
};

const AutoHideTemplate = ({ message, ...args }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color='secondary' variant='text' onClick={handleClose}>
        Undo
      </Button>
    </>
  );

  return (
    <>
      <Button onClick={handleClick}>Open snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={message}
        action={action}
        onClose={handleClose}
      />
    </>
  );
};

const commonArgs = { message: 'This is an inline content snackbar' };

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const AutoHide = AutoHideTemplate.bind({});
AutoHide.args = { ...commonArgs };
