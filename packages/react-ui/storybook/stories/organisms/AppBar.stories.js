import React from 'react';
import {
  Avatar,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { cartoThemeOptions } from '../../../src/theme/carto-theme';
import AppBar from '../../../src/components/organisms/AppBar/AppBar';
import Typography from '../../../src/components/atoms/Typography';
import { DocContainer, DocLink, DocHighlight } from '../../utils/storyStyles';

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
      type: 'validated'
    }
  }
};
export default options;

const Template = (args) => {
  return (
    <>
      <Typography variant='body2' style={{ marginBottom: '24px' }}>
        {'Core structure provided by our CARTO AppBar component (v1)'}
      </Typography>
      <AppBar {...args} position='static' />
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
      <AppBar {...args} position='static'>
        <Chip label={'Some text in a Chip'} color='default' size='small' />

        <Grid container justifyContent='flex-end' spacing={2}>
          <Grid item>
            <IconButton onClick={handleClick}>
              <CheckCircleOutline className='doNotFillIcon' />
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

const BrandingTemplate = (args) => {
  const backgroundColor = '#e1e3e4';
  const textColor = '#024D9E';

  const theme = React.useMemo(
    () =>
      createTheme({
        ...cartoThemeOptions,
        palette: {
          ...cartoThemeOptions.palette,
          brand: {
            appBarMain: backgroundColor,
            appBarContrastText: textColor
          }
        }
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar {...args} position='static' />
    </ThemeProvider>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      We have our own
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/organisms/AppBar/AppBar.js'>
        AppBar
      </DocLink>
      to build the basic structure and styles on top of <i>Mui AppBar</i>. It normalizes
      the size and position of common elements like:{' '}
      <i>logo, texts, avatar and burger menu icon</i>.
      <Typography mt={2}>
        So, instead of Mui AppBar, you should use this one:
        <DocHighlight component='span'>
          react-ui/src/components/organisms/AppBar
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { AppBar } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

const commonArgs = {
  brandText: 'CARTO',
  secondaryText: 'Some text',
  showBurgerMenu: true,
  brandLogo: (
    <a href='/'>
      <img src='/carto-logo.svg' alt='' />
    </a>
  )
};
export const Basic = Template.bind({});
Basic.args = { ...commonArgs };

export const Composition = CustomTemplate.bind({});
Composition.args = { ...commonArgs };

export const CustomBranding = BrandingTemplate.bind({});
CustomBranding.args = {
  ...commonArgs,
  brandLogo: <img src='/carto-logo-dark.svg' alt='' />
};

export const Guide = DocTemplate.bind({});
