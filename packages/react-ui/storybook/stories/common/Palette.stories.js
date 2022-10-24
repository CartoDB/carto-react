import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';

const options = {
  title: 'CARTO Theme/Palette',
  component: Box,
  argTypes: {
    colorVariant: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'info',
          'success',
          'warning',
          'error',
          'default'
        ]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=8786%3A6248'
    },
    viewMode: 'docs'
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(1)
  },
  text: {
    marginBottom: theme.spacing(0.5)
  },
  color: {
    height: 60,
    width: '100%',
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.spacing(0.5)
  }
}));

const ColorBox = ({ colorVariant, colorName }) => {
  const theme = useTheme();
  const color = theme.palette[colorVariant];
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.text}>
        <Typography variant='subtitle1'>{colorName}</Typography>
        <Typography variant='caption'>{color[colorName]}</Typography>
      </Box>
      <Box className={classes.color} style={{ backgroundColor: color[colorName] }} />
    </Box>
  );
};

const ColorTemplate = ({ colorVariant }) => {
  const theme = useTheme();
  const colorDef = theme.palette[colorVariant];
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={colorVariant} colorName={'main'} />
      <ColorBox colorVariant={colorVariant} colorName={'dark'} />
      <ColorBox colorVariant={colorVariant} colorName={'light'} />
      {colorDef.contrastText && (
        <ColorBox colorVariant={colorVariant} colorName={'contrastText'} />
      )}
      {colorDef.background && (
        <ColorBox colorVariant={colorVariant} colorName={'background'} />
      )}
      {colorDef.relatedDark && (
        <ColorBox colorVariant={colorVariant} colorName={'relatedDark'} />
      )}
      {colorDef.relatedLight && (
        <ColorBox colorVariant={colorVariant} colorName={'relatedLight'} />
      )}
    </Grid>
  );
};

const TextTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'text'} colorName={'primary'} />
      <ColorBox colorVariant={'text'} colorName={'secondary'} />
      <ColorBox colorVariant={'text'} colorName={'disabled'} />
      <ColorBox colorVariant={'text'} colorName={'hint'} />
    </Grid>
  );
};

const CommonTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'common'} colorName={'black'} />
      <ColorBox colorVariant={'common'} colorName={'white'} />
    </Grid>
  );
};

const BackgroundTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'background'} colorName={'paper'} />
      <ColorBox colorVariant={'background'} colorName={'default'} />
    </Grid>
  );
};

const ActionTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'action'} colorName={'active'} />
      <ColorBox colorVariant={'action'} colorName={'hover'} />
      <ColorBox colorVariant={'action'} colorName={'disabledBackground'} />
      <ColorBox colorVariant={'action'} colorName={'disabled'} />
      <ColorBox colorVariant={'action'} colorName={'selected'} />
      <ColorBox colorVariant={'action'} colorName={'focus'} />
    </Grid>
  );
};

const GreyTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'grey'} colorName={'900'} />
      <ColorBox colorVariant={'grey'} colorName={'800'} />
      <ColorBox colorVariant={'grey'} colorName={'700'} />
      <ColorBox colorVariant={'grey'} colorName={'600'} />
      <ColorBox colorVariant={'grey'} colorName={'500'} />
      <ColorBox colorVariant={'grey'} colorName={'400'} />
      <ColorBox colorVariant={'grey'} colorName={'300'} />
      <ColorBox colorVariant={'grey'} colorName={'200'} />
      <ColorBox colorVariant={'grey'} colorName={'100'} />
      <ColorBox colorVariant={'grey'} colorName={'50'} />
      <ColorBox colorVariant={'grey'} colorName={'A100'} />
      <ColorBox colorVariant={'grey'} colorName={'A200'} />
      <ColorBox colorVariant={'grey'} colorName={'A400'} />
      <ColorBox colorVariant={'grey'} colorName={'A700'} />
    </Grid>
  );
};

const OtherTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'other'} colorName={'tooltip'} />
      <ColorBox colorVariant={'other'} colorName={'divider'} />
    </Grid>
  );
};

export const Primary = ColorTemplate.bind({});
Primary.args = { colorVariant: 'primary' };

export const Secondary = ColorTemplate.bind({});
Secondary.args = { colorVariant: 'secondary' };

export const Text = TextTemplate.bind({});

export const Background = BackgroundTemplate.bind({});

export const Action = ActionTemplate.bind({});

export const Info = ColorTemplate.bind({});
Info.args = { colorVariant: 'info' };

export const Success = ColorTemplate.bind({});
Success.args = { colorVariant: 'success' };

export const Warning = ColorTemplate.bind({});
Warning.args = { colorVariant: 'warning' };

export const Error = ColorTemplate.bind({});
Error.args = { colorVariant: 'error' };

export const Common = CommonTemplate.bind({});

export const Grey = GreyTemplate.bind({});

export const Default = ColorTemplate.bind({});
Default.args = { colorVariant: 'default' };

export const Other = OtherTemplate.bind({});
