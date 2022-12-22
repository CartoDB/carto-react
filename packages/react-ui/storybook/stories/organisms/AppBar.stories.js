import React from 'react';
import { Avatar, Chip, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { CheckCircleOutline, HelpOutlined } from '@mui/icons-material';
import AppBar from '../../../src/components/organisms/AppBar';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Organisms/AppBar',
  component: AppBar,
  argTypes: {
    brandLogo: {
      description: 'React element to display a logo image'
    },
    brandText: {
      description: 'String to display branding name'
    },
    secondaryText: {
      description: 'Tex displayed on the right of brandText, smaller'
    },
    showBurgerMenu: {
      description: 'Show / hide the burger menu',
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    onClickMenu: {
      description: 'Function to trigger when you click on burger menu'
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=3121%3A61435&t=HI1Xd9yGuft4g9kq-0'
    },
    status: {
      type: 'inDevelopment'
    }
  }
};
export default options;

const Template = (args) => {
  return (
    <>
      <Typography variant='body2' style={{ marginBottom: '24px' }}>
        {'Core structure provided by our CARTO AppBar component'}
      </Typography>
      <AppBar
        {...args}
        position='static'
        brandLogo={<img src='/carto-logo.svg' alt='' />}
      />
    </>
  );
};

const CustomTemplate = (args) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography variant='body2' style={{ marginBottom: '24px' }}>
        {'Custom composition of components inside the CARTO AppBar'}
      </Typography>
      <AppBar
        {...args}
        position='static'
        brandLogo={<img src='/carto-logo.svg' alt='' />}
      >
        <Chip label={'Some text in a Chip'} color='default' size='small' />

        <Grid container justifyContent='flex-end' spacing={2}>
          <Grid item>
            <IconButton onClick={handleClick}>
              <CheckCircleOutline />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Grid>

          <Grid item>
            <Avatar src='/avatar.jpeg' />
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};

const commonArgs = {
  brandText: 'CARTO',
  secondaryText: 'Some text',
  showBurgerMenu: true
};
export const Basic = Template.bind({});
Basic.args = { ...commonArgs };

export const Composition = CustomTemplate.bind({});
Composition.args = { ...commonArgs };
