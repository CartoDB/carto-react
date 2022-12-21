import React from 'react';
import { AppBar, Avatar, IconButton, Menu, MenuItem, SvgIcon } from '@mui/material';
import { Help } from '@mui/icons-material';
import { ReactComponent as logoIcon } from '../../assets/carto-logo.svg';

const options = {
  title: 'Organisms/AppBar',
  component: AppBar,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=3121%3A61435&t=HI1Xd9yGuft4g9kq-0'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar {...args} position='static'>
      <SvgIcon component={logoIcon} />

      <div>
        <IconButton onClick={handleClick}>
          <Help />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      <Avatar src='/avatar.jpeg' />
    </AppBar>
  );
};

export const Playground = Template.bind({});
