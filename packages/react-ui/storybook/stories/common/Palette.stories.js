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
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(1)
  },
  text: {
    marginBottom: theme.spacing(0.5)
  },
  color: {
    height: 48,
    width: '100%',
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: theme.spacing(0.5)
  }
}));

const ColorBox = ({ colorVariant, colorName }) => {
  const theme = useTheme();
  const color = theme.palette[colorVariant];
  const colorValue = colorName ? color[colorName] : color;
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.text}>
        <Typography variant='subtitle1'>{colorName}</Typography>
        <Typography variant='caption'>{colorValue}</Typography>
      </Box>
      <Box className={classes.color} style={{ backgroundColor: colorValue }} />
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
      {colorDef.outlinedBorder && (
        <ColorBox colorVariant={colorVariant} colorName={'outlinedBorder'} />
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

const ShadesTemplate = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h6'>{'Black'}</Typography>
      <Grid container className={classes.container}>
        <ColorBox colorVariant={'black'} colorName={90} />
        <ColorBox colorVariant={'black'} colorName={60} />
        <ColorBox colorVariant={'black'} colorName={40} />
        <ColorBox colorVariant={'black'} colorName={25} />
        <ColorBox colorVariant={'black'} colorName={12} />
        <ColorBox colorVariant={'black'} colorName={8} />
        <ColorBox colorVariant={'black'} colorName={4} />
      </Grid>

      <Typography variant='h6'>{'White'}</Typography>
      <Grid container className={classes.container}>
        <ColorBox colorVariant={'white'} colorName={90} />
        <ColorBox colorVariant={'white'} colorName={60} />
        <ColorBox colorVariant={'white'} colorName={40} />
        <ColorBox colorVariant={'white'} colorName={25} />
        <ColorBox colorVariant={'white'} colorName={12} />
        <ColorBox colorVariant={'white'} colorName={8} />
        <ColorBox colorVariant={'white'} colorName={4} />
      </Grid>
    </>
  );
};

const BrandTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'brand'} colorName={'naviBlue'} />
      <ColorBox colorVariant={'brand'} colorName={'locationRed'} />
      <ColorBox colorVariant={'brand'} colorName={'predictionBlue'} />
      <ColorBox colorVariant={'brand'} colorName={'softBlue'} />
    </Grid>
  );
};

const DividerTemplate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <ColorBox colorVariant={'divider'} />
    </Grid>
  );
};

export const Playground = ColorTemplate.bind({});
Playground.args = { colorVariant: 'primary' };

export const Common = CommonTemplate.bind({});

export const Primary = ColorTemplate.bind({});
Primary.args = { colorVariant: 'primary' };

export const Secondary = ColorTemplate.bind({});
Secondary.args = { colorVariant: 'secondary' };

export const Error = ColorTemplate.bind({});
Error.args = { colorVariant: 'error' };

export const Warning = ColorTemplate.bind({});
Warning.args = { colorVariant: 'warning' };

export const Info = ColorTemplate.bind({});
Info.args = { colorVariant: 'info' };

export const Success = ColorTemplate.bind({});
Success.args = { colorVariant: 'success' };

export const Text = TextTemplate.bind({});

export const Background = BackgroundTemplate.bind({});

export const Action = ActionTemplate.bind({});

export const Divider = DividerTemplate.bind({});

export const Default = ColorTemplate.bind({});
Default.args = { colorVariant: 'default' };

export const Brand = BrandTemplate.bind({});

export const Shades = ShadesTemplate.bind({});
