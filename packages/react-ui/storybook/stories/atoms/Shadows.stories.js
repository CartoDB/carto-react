import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const options = {
  title: 'Atoms/Shadows',
  argTypes: {
    size: {
      defaultValue: 2,
      description:
        'Use `theme.shadows[number]`in styles, or `<Cmp elevation={number} />`',
      control: {
        type: 'select',
        options: [0, 1, 2, 4, 6, 8, 16, 24]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=8990%3A7615'
    },
    viewMode: 'docs'
  }
};
export default options;

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(0.5)
  },
  container: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
    padding: 0,
    backgroundColor: theme.palette.primary.background,
    borderRadius: theme.spacing(0.5)
  }
}));

const ShadowBox = ({ size }) => {
  const theme = useTheme();
  const sizeVariant = theme.shadows[size];
  const classes = useStyles();

  return (
    <Grid item xs={4} sm={3} md={2}>
      <Box className={classes.text}>
        <Typography variant='subtitle1'>{`Elevation ${size}`}</Typography>
        <Typography variant='caption'>{`shadows[${size}]`}</Typography>
      </Box>
      <Box
        className={classes.container}
        style={{
          boxShadow: sizeVariant
        }}
      />
    </Grid>
  );
};

const Template = () => {
  return (
    <Grid container>
      <ShadowBox size={0} />
      <ShadowBox size={1} />
      <ShadowBox size={2} />
      <ShadowBox size={4} />
      <ShadowBox size={6} />
      <ShadowBox size={8} />
      <ShadowBox size={16} />
      <ShadowBox size={24} />
    </Grid>
  );
};

export const Playground = ShadowBox.bind({});

export const Shadows = Template.bind({});
